import { useEffect, useState } from "react";

import { isComplete, render, type Tile as TileType } from "@/scorer";

import { Tile } from "./Tile";

type ScoreBoardProps = {
  guess: string;
  answer: string;
  tiles: TileType[];
};

export function ScoreBoard({ guess, answer, tiles }: ScoreBoardProps) {
  if (guess.length === 0 && answer.length === 0) {
    return (
      <section aria-label="Resultado" className="flex flex-col gap-4">
        <p className="text-t3 text-center font-mono text-xs tracking-wider uppercase">
          digite nos dois campos para ver o score
        </p>
      </section>
    );
  }

  const lengthMismatch = guess.length > 0 && answer.length > 0 && guess.length !== answer.length;
  const chars = Array.from(guess.length >= answer.length ? guess : answer);
  const emojis = render(tiles);
  const solved = isComplete(tiles);
  const groups = groupTilesByWord(tiles, chars);

  return (
    <section aria-label="Resultado" className="flex flex-col gap-4">
      <div
        className="flex flex-wrap items-end justify-center gap-x-4 gap-y-2 md:gap-x-5"
        aria-live="polite"
      >
        {groups.map((group) => (
          <div key={group.start} className="flex flex-nowrap items-end gap-1.5 md:gap-2">
            {group.cells.map((cell) => (
              <Tile
                key={`${cell.position}-${cell.tile}-${cell.char || "_"}`}
                status={cell.tile}
                letter={cell.char}
                position={cell.position}
                dim={lengthMismatch}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center gap-5 pt-2">
        <p
          className="text-t2 font-mono text-2xl leading-none tracking-[-0.05em] select-all"
          aria-label={`emojis: ${emojis}`}
        >
          {emojis}
        </p>
        <CopyButton text={emojis} />
        {solved && <p className="text-ok font-mono text-xs tracking-[0.25em] uppercase">match</p>}
        {lengthMismatch && (
          <p className="text-partial font-mono text-[10px] tracking-[0.2em] uppercase">
            tamanhos diferentes: {guess.length} vs {answer.length}
          </p>
        )}
      </div>
    </section>
  );
}

type WordGroup = {
  start: number;
  cells: { tile: TileType; char: string; position: number }[];
};

function groupTilesByWord(tiles: TileType[], chars: string[]): WordGroup[] {
  const groups: WordGroup[] = [];
  let current: WordGroup | null = null;
  for (const [position, tile] of tiles.entries()) {
    if (tile === "space") {
      current = null;
      continue;
    }
    if (!current) {
      current = { start: position, cells: [] };
      groups.push(current);
    }
    current.cells.push({ tile, char: chars[position] ?? "", position });
  }
  return groups;
}

type CopyButtonProps = { text: string };

function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(id);
  }, [copied]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // clipboard refused; stay idle
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copiar score em emojis"
      className={`focus-visible:outline-thunder-yellow inline-flex h-8 cursor-pointer items-center gap-2 rounded-full border px-3 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-2 focus-visible:outline-offset-2 ${
        copied
          ? "border-ok-border bg-ok-bg text-ok"
          : "bg-surface text-t2 border-white/8 hover:border-white/15 hover:text-t1"
      }`}
    >
      <span aria-hidden="true">{copied ? "✓" : "⧉"}</span>
      <span>{copied ? "copiado" : "copiar"}</span>
    </button>
  );
}
