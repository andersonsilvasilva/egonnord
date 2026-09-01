#!/usr/bin/env python3
"""Gera uma build 100% estática do site (para hospedagem sem Node/Workers, como a Hostinger).

O preset "static" do Nitro (pré-renderização automática) está incompatível com esta
combinação de versões do projeto (vite 8 + nitro 3 beta + rolldown), então este script
contorna o problema fazendo a pré-renderização manualmente:

  1. builda o projeto com o preset "node" (vite.config.hostinger.ts)
  2. sobe esse servidor Node localmente
  3. baixa o HTML já renderizado via HTTP (SSR real, não um placeholder)
  4. derruba o servidor
  5. baixa as imagens que ainda apontam para a nuvem da Lovable (arquivos
     *.png.asset.json em src/assets) e grava como arquivos estáticos reais em
     .output/public/__l5e/assets-v1/<id>/<arquivo>, para o deploy ficar autossuficiente

Resultado final: .output/public/ pronta para subir em qualquer hospedagem Apache/estática.
"""

import json
import re
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUTPUT_PUBLIC = ROOT / ".output" / "public"
PORT = 4174


def run(cmd, **kwargs):
    print(f"$ {' '.join(cmd)}")
    result = subprocess.run(cmd, cwd=ROOT, **kwargs)
    if result.returncode != 0:
        sys.exit(f"Comando falhou: {' '.join(cmd)}")
    return result


def build_node_bundle():
    print("\n=== 1/4 Build (preset node) ===")
    run(["npx", "vite", "build", "--config", "vite.config.hostinger.ts"], shell=True)


def capture_ssr_html():
    print("\n=== 2/4 Capturando HTML renderizado via SSR ===")
    server_entry = ROOT / ".output" / "server" / "index.mjs"
    if not server_entry.exists():
        sys.exit(f"Não encontrei {server_entry} — o build (etapa 1) falhou silenciosamente?")

    env = {"PORT": str(PORT)}
    import os

    proc = subprocess.Popen(
        ["node", str(server_entry)],
        cwd=ROOT,
        env={**os.environ, **env},
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
    )
    try:
        base = f"http://localhost:{PORT}"
        ok = False
        for _ in range(30):
            try:
                urllib.request.urlopen(f"{base}/", timeout=2)
                ok = True
                break
            except Exception:
                time.sleep(0.5)
        if not ok:
            proc.terminate()
            out = proc.stdout.read() if proc.stdout else ""
            sys.exit(f"Servidor Node local não respondeu a tempo.\n{out}")

        html = urllib.request.urlopen(f"{base}/", timeout=10).read()
        (OUTPUT_PUBLIC / "index.html").write_bytes(html)
        print(f"  index.html salvo ({len(html)} bytes)")

        try:
            req = urllib.request.Request(f"{base}/__rota-inexistente-para-404__")
            with urllib.request.urlopen(req, timeout=10) as resp:
                not_found_html = resp.read()
        except urllib.error.HTTPError as e:
            not_found_html = e.read()
        (OUTPUT_PUBLIC / "404.html").write_bytes(not_found_html)
        print(f"  404.html salvo ({len(not_found_html)} bytes)")
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=5)
        except subprocess.TimeoutExpired:
            proc.kill()


def bake_cloud_assets():
    print("\n=== 3/4 Baixando imagens da nuvem Lovable para arquivos estáticos ===")
    assets_dir = ROOT / "src" / "assets"
    pointers = sorted(assets_dir.glob("*.asset.json"))
    if not pointers:
        print("  nenhum ponteiro .asset.json encontrado, pulando.")
        return

    html = (OUTPUT_PUBLIC / "index.html").read_text(encoding="utf-8")

    for pointer in pointers:
        manifest = json.loads(pointer.read_text(encoding="utf-8"))
        project_id = manifest["project_id"]
        url_path = manifest["url"]  # ex: /__l5e/assets-v1/<id>/<arquivo>.png
        host = f"id-preview--{project_id}.lovable.app"
        remote_url = f"https://{host}{url_path}"

        if url_path not in html:
            print(f"  {manifest['original_filename']} não é referenciada no HTML final, pulando.")
            continue

        dest = OUTPUT_PUBLIC / url_path.lstrip("/")
        dest.parent.mkdir(parents=True, exist_ok=True)

        print(f"  {manifest['original_filename']} <- {remote_url}")
        try:
            req = urllib.request.Request(remote_url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=20) as resp:
                dest.write_bytes(resp.read())
        except Exception as e:
            sys.exit(
                f"Falha ao baixar asset da nuvem ({manifest['original_filename']}): {e}\n"
                "O host de preview do Lovable pode estar fora do ar, ou o projeto não é mais público."
            )


def sanity_check():
    print("\n=== 4/4 Checagem final ===")
    required = ["index.html", "404.html", "favicon.png", "robots.txt", ".htaccess"]
    missing = [f for f in required if not (OUTPUT_PUBLIC / f).exists()]
    if missing:
        sys.exit(f"Arquivos esperados ausentes em .output/public: {missing}")

    html = (OUTPUT_PUBLIC / "index.html").read_text(encoding="utf-8")
    dangling = set()
    for m in re.finditer(r'(?:src|href)="(/(?:assets|__l5e)/[^"]+)"', html):
        rel = m.group(1).lstrip("/")
        if not (OUTPUT_PUBLIC / rel).exists():
            dangling.add(m.group(1))
    if dangling:
        sys.exit(f"Referências no HTML sem arquivo correspondente em .output/public: {sorted(dangling)}")

    print("  OK — .output/public está completa e autossuficiente.")
    print(f"\nBuild pronta em: {OUTPUT_PUBLIC}")


if __name__ == "__main__":
    build_node_bundle()
    capture_ssr_html()
    bake_cloud_assets()
    sanity_check()
