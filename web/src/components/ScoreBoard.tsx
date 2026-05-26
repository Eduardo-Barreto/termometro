import type { Tile as TileType } from "@/scorer";

import { Tile } from "./Tile";

type ScoreBoardProps = {
  guess: string;
  answer: string;
  tiles: TileType[];
  emojis: string;
  solved: boolean;
};

export function ScoreBoard({ guess, answer, tiles, emojis, solved }: ScoreBoardProps) {
  const lengthMismatch = guess.length > 0 && answer.length > 0 && guess.length !== answer.length;
  const isEmpty = guess.length === 0 && answer.length === 0;
  const reference = guess.length >= answer.length ? guess : answer;
  const chars = Array.from(reference);

  return (
    <section aria-label="Resultado" className="flex flex-col gap-4">
      {isEmpty && (
        <p className="text-t3 text-center font-mono text-xs tracking-wider uppercase">
          digite nos dois campos para ver o score
        </p>
      )}
      {!isEmpty && tiles.length > 0 && (
        <div
          className="flex flex-wrap items-end justify-center gap-1.5 md:gap-2"
          aria-live="polite"
        >
          {tiles.map((tile, i) => (
            <Tile
              key={`${i}-${tile}-${chars[i] ?? "_"}`}
              status={tile}
              letter={chars[i] ?? ""}
              index={i}
              dim={lengthMismatch}
            />
          ))}
        </div>
      )}
      {!isEmpty && emojis.length > 0 && (
        <div className="flex flex-col items-center gap-2">
          <p
            className="text-t2 font-mono text-2xl leading-none tracking-[-0.05em] select-all"
            aria-label={`emojis: ${emojis}`}
          >
            {emojis}
          </p>
          {solved && <p className="text-ok font-mono text-xs tracking-[0.25em] uppercase">match</p>}
          {lengthMismatch && (
            <p className="text-partial font-mono text-[10px] tracking-[0.2em] uppercase">
              tamanhos diferentes: {guess.length} vs {answer.length}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
