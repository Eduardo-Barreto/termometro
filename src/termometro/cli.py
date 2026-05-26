from __future__ import annotations

import argparse
import sys
from collections.abc import Sequence

from termometro.scorer import render, score


def _build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="termometro",
        description="Compare two strings and print a Wordle/term.ooo emoji score.",
    )
    parser.add_argument("guess", help="The guessed word or phrase")
    parser.add_argument("answer", help="The target word or phrase")
    parser.add_argument(
        "--keep-case",
        action="store_true",
        help="Match letters case-sensitively (default: case-insensitive)",
    )
    parser.add_argument(
        "--keep-accents",
        action="store_true",
        help="Treat accented letters as distinct (default: á == a)",
    )
    parser.add_argument(
        "--no-letters",
        action="store_true",
        help="Print only the emoji row, skip the guess letters below it",
    )
    return parser


def main(argv: Sequence[str] | None = None) -> int:
    parser = _build_parser()
    args = parser.parse_args(argv)

    try:
        tiles = score(
            args.guess,
            args.answer,
            case_insensitive=not args.keep_case,
            ignore_accents=not args.keep_accents,
        )
    except ValueError as err:
        print(f"error: {err}", file=sys.stderr)
        return 2

    print(render(tiles))
    if not args.no_letters:
        print(" ".join(args.guess))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
