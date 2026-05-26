export function Header() {
  return (
    <header className="flex flex-col items-center gap-3 pt-4 pb-2 text-center">
      <h1 className="font-mono text-4xl font-bold tracking-tight md:text-6xl">
        termometro
        <span className="text-thunder-yellow drop-shadow-[0_0_6px_rgba(255,229,0,0.25)]">.</span>
      </h1>
      <p className="text-t3 font-mono text-[10px] tracking-[0.25em] uppercase md:text-xs">
        score wordle ao vivo
      </p>
    </header>
  );
}
