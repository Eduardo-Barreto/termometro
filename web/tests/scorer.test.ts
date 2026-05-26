import { describe, expect, test } from "bun:test";

import { isComplete, render, score } from "@/scorer";

describe("score", () => {
  test("returns all green when strings match", () => {
    expect(score("casa", "casa")).toEqual(["green", "green", "green", "green"]);
  });

  test("returns all black when nothing overlaps", () => {
    expect(score("xyz", "abc")).toEqual(["black", "black", "black"]);
  });

  test("flags yellow for right letter in wrong place", () => {
    expect(score("rosa", "arco")).toEqual(["yellow", "yellow", "black", "yellow"]);
  });

  test("only yellows duplicate guess letter once", () => {
    expect(score("aabbb", "xaxxx")).toEqual(["black", "green", "black", "black", "black"]);
  });

  test("greens consume the letter before yellows", () => {
    expect(score("erase", "speed")).toEqual(["yellow", "black", "black", "yellow", "yellow"]);
  });

  test("two greens block yellow for a third occurrence", () => {
    expect(score("aaaa", "aabb")).toEqual(["green", "green", "black", "black"]);
  });

  test("ignores accents by default", () => {
    expect(score("ção", "cao")).toEqual(["green", "green", "green"]);
  });

  test("respects accents when disabled", () => {
    expect(score("ção", "cao", { ignoreAccents: false })).toEqual(["black", "black", "green"]);
  });

  test("is case-insensitive by default", () => {
    expect(score("CASA", "casa")).toEqual(["green", "green", "green", "green"]);
  });

  test("respects case when caseInsensitive is false", () => {
    const tiles = score("CASA", "casa", { caseInsensitive: false });
    expect(tiles.every((t) => t !== "green")).toBe(true);
  });

  test("preserves spaces in phrases", () => {
    expect(score("oi mundo", "oi mundo")).toEqual([
      "green",
      "green",
      "space",
      "green",
      "green",
      "green",
      "green",
      "green",
    ]);
  });

  test("scores phrases with preserved space and mismatched middle letter", () => {
    expect(score("oi mando", "oi mundo")).toEqual([
      "green",
      "green",
      "space",
      "green",
      "black",
      "green",
      "green",
      "green",
    ]);
  });

  test("space does not consume a letter match", () => {
    expect(score("a b", "bab")).toEqual(["yellow", "space", "green"]);
  });

  test("pads with empty tiles when guess is shorter", () => {
    expect(score("ab", "abcd")).toEqual(["green", "green", "empty", "empty"]);
  });

  test("marks answer-overflow spaces so word groups survive when guess is shorter", () => {
    expect(score("oi", "oi tudo")).toEqual([
      "green",
      "green",
      "space",
      "empty",
      "empty",
      "empty",
      "empty",
    ]);
  });

  test("pads with empty tiles when guess is longer", () => {
    expect(score("abcd", "ab")).toEqual(["green", "green", "black", "black"]);
  });

  test("returns empty list for empty inputs", () => {
    expect(score("", "")).toEqual([]);
  });
});

describe("render", () => {
  test("concatenates emoji tiles", () => {
    expect(render(["green", "yellow", "black"])).toBe("\u{1F7E9}\u{1F7E8}⬛");
  });

  test("renders empty list as empty string", () => {
    expect(render([])).toBe("");
  });

  test("skips empty tiles", () => {
    expect(render(["green", "empty", "yellow"])).toBe("\u{1F7E9}\u{1F7E8}");
  });
});

describe("isComplete", () => {
  test("is true when every tile is green or space", () => {
    expect(isComplete(["green", "green", "space", "green"])).toBe(true);
  });

  test("is false when any tile is non-green", () => {
    expect(isComplete(["green", "yellow"])).toBe(false);
  });

  test("is false for empty tile list", () => {
    expect(isComplete([])).toBe(false);
  });

  test("is false when there are empty tiles", () => {
    expect(isComplete(["green", "empty"])).toBe(false);
  });
});
