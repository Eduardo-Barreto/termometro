# termometro

Compara duas strings (palavras ou frases) e imprime o score no estilo
[term.ooo](https://term.ooo) / Wordle com emojis 🟩🟨⬛.

## Instalação

Requer [uv](https://docs.astral.sh/uv/) e Python 3.12+.

```bash
uv sync
```

## Uso

```bash
uv run termometro <palpite> <alvo>
```

Exemplos:

```bash
$ uv run termometro casa casa
🟩🟩🟩🟩
c a s a

$ uv run termometro rosa arco
🟨🟨⬛🟨
r o s a

$ uv run termometro "oi mando" "oi mundo"
🟩🟩🟩🟩⬛🟩🟩🟩
o i   m a n d o
```

Por padrão a comparação é **case-insensitive** e **ignora acentos**
(`á == a`, `ç == c`), como faz o term.ooo. Para comportamento estrito:

```bash
uv run termometro --keep-case --keep-accents "CASA" "casa"
```

Outras flags:

- `--no-letters` — imprime só a linha de emojis.

Erro de comprimentos diferentes sai com código `2`.

## Algoritmo

Duas passadas clássicas do Wordle, importante para letras repetidas:

1. Primeira passada marca todos os 🟩 e conta as letras restantes do alvo.
2. Segunda passada marca 🟨 apenas enquanto ainda houver letra sobrando no
   alvo — caso contrário ⬛.

Isso garante que se o alvo tem **um** `a` e o palpite tem **dois** `a`,
só um deles fica colorido.

## Desenvolvimento

```bash
uv run pytest        # roda os testes
uv run ruff check    # lint
```

## API Python

```python
from termometro import score, render

tiles = score("rosa", "arco")     # [YELLOW, YELLOW, BLACK, YELLOW]
print(render(tiles))               # 🟨🟨⬛🟨
```
