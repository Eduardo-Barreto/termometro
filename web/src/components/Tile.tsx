import type { Tile as TileStatus } from "@/scorer";

type TileProps = {
  status: TileStatus;
  letter: string;
  position: number;
  dim?: boolean;
};

const STATUS_CLASSES: Record<TileStatus, string> = {
  green: "bg-ok-bg border-ok-border text-ok",
  yellow: "bg-partial-bg border-partial-border text-partial",
  black: "bg-empty-bg border-empty-border text-t2",
  space: "border-transparent bg-transparent text-transparent",
  empty: "bg-surface border-white/6 text-t3",
};

export function Tile({ status, letter, position, dim }: TileProps) {
  const isSpace = status === "space";

  return (
    <span
      role="presentation"
      data-status={status}
      className={`relative inline-flex h-12 min-w-[2.75rem] items-center justify-center rounded-md border font-mono text-lg font-bold tracking-tight uppercase md:h-14 md:min-w-[3.25rem] md:text-2xl ${STATUS_CLASSES[status]} ${dim ? "opacity-50" : ""}`}
      style={{
        animation: isSpace
          ? undefined
          : `tile-in 360ms cubic-bezier(0.23,1,0.32,1) ${position * 35}ms both`,
      }}
    >
      {isSpace ? "" : letter || "·"}
    </span>
  );
}
