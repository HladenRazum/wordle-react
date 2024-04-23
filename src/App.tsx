import { useEffect, useState } from "react";
import Word from "./Word";
import { WORDS } from "./words";

const lettersRegex = /^[a-zA-Z]+$/;
const solution = WORDS[Math.floor(Math.random() * WORDS.length)];

const isNotAllowedKey = (key: string) => {
  return (
    !lettersRegex.test(key) ||
    key === "CapsLock" ||
    key === "Shift" ||
    key === "Control" ||
    key === "Alt" ||
    key === "Spacebar"
  );
};

function App() {
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [usedLetters, setUsedLetters] = useState<string[]>([]);

  useEffect(() => {
    const handleType = (e: globalThis.KeyboardEvent) => {
      if (isNotAllowedKey(e.key) || isGameOver) {
        return;
      }

      if (e.key === "Enter") {
        if (currentGuess.length < 5) {
          return;
        }

        const newGuesses = [...guesses];
        newGuesses[currentGuessIndex] = currentGuess;
        setGuesses(newGuesses);

        if (currentGuessIndex !== 5) {
          setCurrentGuess("");
        }

        const isCorrect = currentGuess === solution;

        if (
          isCorrect ||
          (currentGuessIndex === 5 && currentGuess.length >= 5)
        ) {
          setIsGameOver(true);
        }

        setCurrentGuessIndex((index) => {
          return index < 5 ? index + 1 : index;
        });
      }

      if (e.key === "Backspace") {
        setCurrentGuess((guess) => guess.slice(0, -1));
      } else {
        setCurrentGuess((guess) => {
          if (e.key === "Enter") return guess;
          return guess + e.key.toUpperCase();
        });
      }
    };

    window.addEventListener("keydown", handleType);

    return () => {
      window.removeEventListener("keydown", handleType);
    };
  }, [currentGuess, currentGuessIndex, guesses, isGameOver]);

  return (
    <main className="Wordle">
      <h1>Wordle App</h1>
      <div>
        {guesses.map((guess, i) => {
          const isCurrentGuess = i === currentGuessIndex;
          return (
            <Word
              isActive={isCurrentGuess}
              word={isCurrentGuess ? currentGuess : guess ?? ""}
              key={i}
              solution={solution}
              isFinal={!isCurrentGuess || (isCurrentGuess && isGameOver)}
            />
          );
        })}
      </div>
      {isGameOver && (
        <p>
          The word was: <span className="solution">{solution}</span>
        </p>
      )}
      <ul className="info">
        <p>Used letters: </p>
        {usedLetters.map((letter) => letter)}
      </ul>
    </main>
  );
}

export default App;
