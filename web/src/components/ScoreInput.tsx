type ScoreInputProps = {
  label: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
};

export function ScoreInput({ label, value, onChange, placeholder, autoFocus }: ScoreInputProps) {
  return (
    <label className="group flex flex-col gap-1.5">
      <span className="text-t3 font-mono text-[10px] font-bold tracking-[0.25em] uppercase">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        autoCapitalize="none"
        {...(autoFocus ? { autoFocus: true } : {})}
        aria-label={label}
        className="bg-surface text-t1 placeholder:text-t3 focus:border-thunder-yellow/25 h-14 w-full rounded-lg border border-white/6 px-4 font-sans text-base font-medium transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] outline-none focus:shadow-[0_0_0_3px_rgba(255,229,0,0.04)] md:h-16 md:text-lg"
      />
    </label>
  );
}
