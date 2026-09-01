#!/usr/bin/env python3
"""Envia o conteúdo de .output/public (gerado por build-hostinger.py) para a Hostinger.

Fluxo:
  1. empacota .output/public num .tar.gz
  2. envia para o servidor via scp
  3. no servidor: guarda a versão atual em ~/deploy_backups/<timestamp>/ (histórico,
     nunca é apagado automaticamente) e sincroniza o pacote novo para dentro de
     public_html com `rsync --delete` (limpa arquivos de builds antigas que não
     existem mais na build atual)
  4. confere que o site responde 200 depois do deploy

Uso: python scripts/deploy-hostinger.py
Requer: ter rodado build-hostinger.py antes, e o alias SSH "egon-nord-hostinger"
configurado em ~/.ssh/config.
"""

import subprocess
import sys
import tarfile
import time
import urllib.request
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUTPUT_PUBLIC = ROOT / ".output" / "public"
SSH_HOST = "egon-nord-hostinger"
REMOTE_DOMAIN_DIR = "~/domains/egonnord.com.br"
REMOTE_PUBLIC_HTML = f"{REMOTE_DOMAIN_DIR}/public_html"
SITE_URL = "https://egonnord.com.br/"


def run(cmd, **kwargs):
    print(f"$ {' '.join(cmd)}")
    result = subprocess.run(cmd, cwd=ROOT, **kwargs)
    if result.returncode != 0:
        sys.exit(f"Comando falhou: {' '.join(cmd)}")
    return result


def ssh(remote_cmd: str):
    return run(["ssh", SSH_HOST, remote_cmd])


def main():
    if not OUTPUT_PUBLIC.exists():
        sys.exit("`.output/public` não existe. Rode `python scripts/build-hostinger.py` primeiro.")

    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    tarball = ROOT / f".output-deploy-{timestamp}.tar.gz"

    print(f"\n=== 1/4 Empacotando {OUTPUT_PUBLIC} ===")
    with tarfile.open(tarball, "w:gz") as tar:
        for item in OUTPUT_PUBLIC.iterdir():
            tar.add(item, arcname=item.name)
    print(f"  {tarball.name} ({tarball.stat().st_size / 1024:.0f} KB)")

    remote_tmp = f"~/deploy_incoming_{timestamp}"
    remote_release = f"~/deploy_releases/{timestamp}"

    print("\n=== 2/4 Enviando pacote via scp ===")
    run(["scp", str(tarball), f"{SSH_HOST}:{remote_tmp}.tar.gz"])

    print("\n=== 3/4 Aplicando no servidor (com backup) ===")
    remote_script = (
        f"set -e && "
        f"mkdir -p {remote_release} && "
        f"tar xzf {remote_tmp}.tar.gz -C {remote_release} && "
        f"rm {remote_tmp}.tar.gz && "
        f"mkdir -p ~/deploy_backups && "
        f"cp -a {REMOTE_PUBLIC_HTML} ~/deploy_backups/{timestamp} && "
        f"rsync -a --delete {remote_release}/ {REMOTE_PUBLIC_HTML}/ && "
        f"echo DEPLOY_OK"
    )
    ssh(remote_script)

    tarball.unlink()

    print("\n=== 4/4 Verificando o site publicado ===")
    time.sleep(2)
    try:
        with urllib.request.urlopen(SITE_URL, timeout=15) as resp:
            status = resp.status
    except Exception as e:
        sys.exit(f"Site não respondeu após o deploy: {e}")

    if status != 200:
        sys.exit(f"Site respondeu com status {status} após o deploy.")

    print(f"  {SITE_URL} -> HTTP {status}")
    print(f"\nDeploy concluído. Backup da versão anterior em ~/deploy_backups/{timestamp} no servidor.")


if __name__ == "__main__":
    main()
