from __future__ import annotations

import pytest

from termometro.scorer import BLACK, GREEN, SPACE, YELLOW, render, score


def test_all_green_when_strings_match():
    assert score("casa", "casa") == [GREEN, GREEN, GREEN, GREEN]


def test_all_black_when_nothing_overlaps():
    assert score("xyz", "abc") == [BLACK, BLACK, BLACK]


def test_classic_yellow_for_right_letter_wrong_place():
    assert score("rosa", "arco") == [YELLOW, YELLOW, BLACK, YELLOW]


def test_duplicate_guess_letter_only_yellow_once():
    assert score("aabbb", "xaxxx") == [BLACK, GREEN, BLACK, BLACK, BLACK]


def test_green_consumes_before_yellow():
    assert score("erase", "speed") == [YELLOW, BLACK, BLACK, YELLOW, YELLOW]


def test_two_greens_block_yellow_for_third_occurrence():
    assert score("aaaa", "aabb") == [GREEN, GREEN, BLACK, BLACK]


def test_accents_ignored_by_default():
    assert score("ção", "cao") == [GREEN, GREEN, GREEN]


def test_accents_respected_when_disabled():
    assert score("ção", "cao", ignore_accents=False) == [BLACK, BLACK, GREEN]


def test_case_insensitive_by_default():
    assert score("CASA", "casa") == [GREEN, GREEN, GREEN, GREEN]


def test_case_sensitive_when_keep_case():
    tiles = score("CASA", "casa", case_insensitive=False)
    assert all(tile != GREEN for tile in tiles)


def test_phrases_preserve_spaces():
    assert score("oi mundo", "oi mundo") == [
        GREEN, GREEN, SPACE, GREEN, GREEN, GREEN, GREEN, GREEN,
    ]


def test_phrase_partial_match_with_preserved_space():
    assert score("oi mando", "oi mundo") == [
        GREEN, GREEN, SPACE, GREEN, BLACK, GREEN, GREEN, GREEN,
    ]


def test_space_does_not_consume_letter_match():
    assert score("a b", "bab") == [YELLOW, SPACE, GREEN]


def test_length_mismatch_raises():
    with pytest.raises(ValueError, match="same length"):
        score("abc", "abcd")


def test_render_concatenates_emojis():
    assert render([GREEN, YELLOW, BLACK]) == "🟩🟨⬛"


def test_empty_strings_return_empty_list():
    assert score("", "") == []
    assert render([]) == ""
