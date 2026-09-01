// Build de produção alternativa para hospedagem estática (Hostinger / Apache),
// que não tem runtime de Node ou Cloudflare Workers.
//
// Diferenças em relação ao vite.config.ts principal (usado pelo sandbox do Lovable
// e pelo deploy em Cloudflare):
//   - Não redireciona a entrada do servidor para src/server.ts (aquele wrapper é
//     especificamente um handler `fetch` estilo Cloudflare Workers; o preset
//     estático do Nitro pré-renderiza as rotas usando o handler h3 padrão do
//     TanStack Start, então precisa da entrada default).
//   - Usa nitro.preset "static": pré-renderiza todas as rotas em arquivos .html
//     e gera uma pasta 100% estática (sem servidor), pronta para qualquer Apache.
//
// Uso: npm run build:hostinger
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: { preset: "node" },
});
