type OptionsBarProps = {
  caseInsensitive: boolean;
  ignoreAccents: boolean;
  onToggleCase: () => void;
  onToggleAccents: () => void;
};

export function OptionsBar({
  caseInsensitive,
  ignoreAccents,
  onToggleCase,
  onToggleAccents,
}: OptionsBarProps) {
  return (
    <section aria-label="Opções" className="flex flex-wrap items-center justify-center gap-2">
      <Toggle
        label="case-insensitive"
        active={caseInsensitive}
        onToggle={onToggleCase}
        hint={caseInsensitive ? "a == A" : "a != A"}
      />
      <Toggle
        label="ignorar acentos"
        active={ignoreAccents}
        onToggle={onToggleAccents}
        hint={ignoreAccents ? "á == a" : "á != a"}
      />
    </section>
  );
}

type ToggleProps = {
  label: string;
  active: boolean;
  hint: string;
  onToggle: () => void;
};

function Toggle({ label, active, hint, onToggle }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      className={`focus-visible:outline-thunder-yellow inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border px-3 font-mono text-[11px] tracking-[0.15em] uppercase transition-colors duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-2 focus-visible:outline-offset-2 ${
        active
          ? "bg-thunder-yellow/8 border-thunder-yellow/30 text-thunder-yellow"
          : "border-white/8 bg-surface text-t3 hover:border-white/15 hover:text-t2"
      }`}
    >
      <span
        aria-hidden="true"
        className={`inline-block size-1.5 rounded-full ${active ? "bg-thunder-yellow" : "bg-t3"}`}
      />
      <span>{label}</span>
      <span className="text-t3 normal-case">{hint}</span>
    </button>
  );
}
