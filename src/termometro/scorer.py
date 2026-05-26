from __future__ import annotations

import unicodedata
from collections import Counter
from enum import StrEnum


class Tile(StrEnum):
    GREEN = "🟩"
    YELLOW = "🟨"
    BLACK = "⬛"
    SPACE = "  "  # two ASCII spaces, matching one wide emoji column


GREEN = Tile.GREEN
YELLOW = Tile.YELLOW
BLACK = Tile.BLACK
SPACE = Tile.SPACE


def _strip_accents(text: str) -> str:
    decomposed = unicodedata.normalize("NFD", text)
    return "".join(ch for ch in decomposed if unicodedata.category(ch) != "Mn")


def _normalize(text: str, *, case_insensitive: bool, ignore_accents: bool) -> str:
    if ignore_accents:
        text = _strip_accents(text)
    if case_insensitive:
        text = text.casefold()
    return text


def score(
    guess: str,
    answer: str,
    *,
    case_insensitive: bool = True,
    ignore_accents: bool = True,
) -> list[Tile]:
    """Return per-character Wordle tiles comparing guess against answer.

    Uses the classic two-pass algorithm so duplicate letters in the guess do
    not double-count occurrences in the answer: greens consume their letter
    first, then yellows are assigned only while the answer still has spare
    matches.
    """
    if len(guess) != len(answer):
        raise ValueError(
            f"guess and answer must have the same length (got {len(guess)} vs {len(answer)})"
        )

    normalized_guess = _normalize(
        guess, case_insensitive=case_insensitive, ignore_accents=ignore_accents
    )
    normalized_answer = _normalize(
        answer, case_insensitive=case_insensitive, ignore_accents=ignore_accents
    )

    tiles: list[Tile] = [Tile.BLACK] * len(guess)
    remaining: Counter[str] = Counter()

    for i, (g, a) in enumerate(zip(normalized_guess, normalized_answer, strict=True)):
        if g.isspace():
            tiles[i] = Tile.SPACE
            if not a.isspace():
                remaining[a] += 1
            continue
        if g == a:
            tiles[i] = Tile.GREEN
        elif not a.isspace():
            remaining[a] += 1

    for i, (g, tile) in enumerate(zip(normalized_guess, tiles, strict=True)):
        if tile is not Tile.BLACK:
            continue
        if remaining[g] > 0:
            tiles[i] = Tile.YELLOW
            remaining[g] -= 1

    return tiles


def render(tiles: list[Tile]) -> str:
    return "".join(tile.value for tile in tiles)
