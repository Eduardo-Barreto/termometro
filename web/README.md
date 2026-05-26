# termometro/web

Versão web do `termometro`: compara duas strings ao vivo e renderiza
o score estilo [term.ooo](https://term.ooo) com emojis 🟩🟨⬛. Sem botão de
submeter — o resultado atualiza a cada tecla.

## Stack

- React 19 + Vite + TypeScript
- bun (runtime, package manager, test runner)
- Tailwind v4 (estilo inspirado no [thundle](../../thundle))
- oxlint + oxfmt + knip (toolchain do nimbus-app)

## Comandos

```bash
cd web
bun install
bun run dev          # vite dev server em :5173
bun run build        # tsc + vite build
bun test             # bun:test
bun run lint         # oxlint
bun run knip         # check de dead code
bun run verify       # tsc + lint + knip + test + fmt:check
```
