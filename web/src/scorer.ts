export type Tile = "green" | "yellow" | "black" | "space" | "empty";

export const TILE_EMOJI: Record<Exclude<Tile, "empty">, string> = {
  green: "🟩",
  yellow: "🟨",
  black: "⬛",
  space: "  ",
};

export type ScoreOptions = {
  caseInsensitive?: boolean;
  ignoreAccents?: boolean;
};

function stripAccents(text: string): string {
  return text.normalize("NFD").replaceAll(/\p{Mn}/gu, "");
}

function normalize(text: string, opts: Required<ScoreOptions>): string {
  let out = text;
  if (opts.ignoreAccents) out = stripAccents(out);
  if (opts.caseInsensitive) out = out.toLocaleLowerCase();
  return out;
}

/**
 * Wordle two-pass scoring. Greens consume their answer-letter first so a
 * duplicated letter in the guess can't double-claim a single occurrence
 * in the answer. Space positions are tagged separately to preserve word
 * boundaries visually without distorting the letter accounting.
 */
export function score(guess: string, answer: string, options: ScoreOptions = {}): Tile[] {
  const opts: Required<ScoreOptions> = {
    caseInsensitive: options.caseInsensitive ?? true,
    ignoreAccents: options.ignoreAccents ?? true,
  };

  const len = Math.max(guess.length, answer.length);
  if (len === 0) return [];

  const ng = normalize(guess, opts);
  const na = normalize(answer, opts);
  const tiles: Tile[] = Array.from({ length: len }, () => "empty" as Tile);
  const remaining = new Map<string, number>();

  for (let i = 0; i < len; i++) {
    const g = ng[i];
    const a = na[i];
    if (g === undefined) {
      tiles[i] = "empty";
      if (a !== undefined && !/\s/.test(a)) {
        remaining.set(a, (remaining.get(a) ?? 0) + 1);
      }
      continue;
    }
    if (/\s/.test(g)) {
      tiles[i] = "space";
      if (a !== undefined && !/\s/.test(a)) {
        remaining.set(a, (remaining.get(a) ?? 0) + 1);
      }
      continue;
    }
    if (a !== undefined && g === a) {
      tiles[i] = "green";
    } else {
      tiles[i] = "black";
      if (a !== undefined && !/\s/.test(a)) {
        remaining.set(a, (remaining.get(a) ?? 0) + 1);
      }
    }
  }

  for (let i = 0; i < len; i++) {
    if (tiles[i] !== "black") continue;
    const g = ng[i];
    if (g === undefined) continue;
    const left = remaining.get(g) ?? 0;
    if (left > 0) {
      tiles[i] = "yellow";
      remaining.set(g, left - 1);
    }
  }

  return tiles;
}

export function render(tiles: Tile[]): string {
  return tiles.map((t) => (t === "empty" ? "" : TILE_EMOJI[t])).join("");
}

export function isComplete(tiles: Tile[]): boolean {
  return tiles.length > 0 && tiles.every((t) => t === "green" || t === "space");
}
