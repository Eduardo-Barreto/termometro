import { useState } from "react";

import { Background } from "@/components/Background";
import { Header } from "@/components/Header";
import { OptionsBar } from "@/components/OptionsBar";
import { ScoreBoard } from "@/components/ScoreBoard";
import { ScoreInput } from "@/components/ScoreInput";
import { score } from "@/scorer";

export function App() {
  const [guess, setGuess] = useState("");
  const [answer, setAnswer] = useState("");
  const [caseInsensitive, setCaseInsensitive] = useState(true);
  const [ignoreAccents, setIgnoreAccents] = useState(true);

  const tiles = score(guess, answer, { caseInsensitive, ignoreAccents });

  return (
    <div className="text-t1 relative min-h-dvh font-sans">
      <Background />
      <main className="relative mx-auto flex max-w-3xl flex-col gap-8 px-4 pt-8 pb-16 md:px-6 md:pt-12">
        <Header />
        <OptionsBar
          caseInsensitive={caseInsensitive}
          ignoreAccents={ignoreAccents}
          onToggleCase={() => setCaseInsensitive((v) => !v)}
          onToggleAccents={() => setIgnoreAccents((v) => !v)}
        />
        <section className="flex flex-col gap-3">
          <ScoreInput
            label="Alvo"
            value={answer}
            onChange={setAnswer}
            placeholder="a palavra-resposta"
            autoFocus
          />
          <ScoreInput
            label="Palpite"
            value={guess}
            onChange={setGuess}
            placeholder="o que voce chutou"
          />
        </section>
        <ScoreBoard guess={guess} answer={answer} tiles={tiles} />
      </main>
    </div>
  );
}
