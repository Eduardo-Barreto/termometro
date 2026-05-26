import { describe, expect, test } from "bun:test";
import { fireEvent, render, screen } from "@testing-library/react";

import { App } from "@/App";

describe("App", () => {
  test("scores reactively as the user types in both fields", () => {
    render(<App />);
    const guess = screen.getByLabelText("Palpite") as HTMLInputElement;
    const answer = screen.getByLabelText("Alvo") as HTMLInputElement;

    fireEvent.change(guess, { target: { value: "casa" } });
    fireEvent.change(answer, { target: { value: "casa" } });

    expect(screen.getByLabelText(/emojis:/).textContent).toBe(
      "\u{1F7E9}\u{1F7E9}\u{1F7E9}\u{1F7E9}",
    );
    expect(screen.getAllByText(/match/i).length).toBeGreaterThan(0);
  });

  test("toggling ignore-accents flips scoring live", () => {
    render(<App />);
    const guess = screen.getByLabelText("Palpite") as HTMLInputElement;
    const answer = screen.getByLabelText("Alvo") as HTMLInputElement;

    fireEvent.change(guess, { target: { value: "ção" } });
    fireEvent.change(answer, { target: { value: "cao" } });

    expect(screen.getByLabelText(/emojis:/).textContent).toBe("\u{1F7E9}\u{1F7E9}\u{1F7E9}");

    fireEvent.click(screen.getByRole("button", { name: /ignorar acentos/i }));

    expect(screen.getByLabelText(/emojis:/).textContent).toBe("⬛⬛\u{1F7E9}");
  });
});
