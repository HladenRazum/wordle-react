import { useEffect, useState } from 'react';
import Word from './Word';
import { WORDS } from './words';

const lettersRegex = /^[a-zA-Z]+$/;

function App() {
  const [solution, setSolution] = useState<string>(
    WORDS[Math.floor(Math.random() * WORDS.length)]
  );
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const handleType = (e: globalThis.KeyboardEvent) => {
      if (
        !lettersRegex.test(e.key) ||
        e.key === 'CapsLock' ||
        e.key === 'Shift' ||
        isGameOver
      ) {
        return;
      }

      if (e.key === 'Enter') {
        if (currentGuess.length < 5) {
          return;
        }

        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex((val) => val == null)] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess('');

        const isCorrect = currentGuess === solution;

        if (isCorrect) {
          setIsGameOver(true);
        }
      }

      if (e.key === 'Backspace') {
        setCurrentGuess((guess) => guess.slice(0, -1));
      } else {
        setCurrentGuess((guess) => {
          if (guess.length >= 5) return guess;
          return guess + e.key.toUpperCase();
        });
      }
    };

    window.addEventListener('keydown', handleType);

    return () => {
      window.removeEventListener('keydown', handleType);
    };
  }, [currentGuess, isGameOver, solution]);

  return (
    <main className='Wordle'>
      {isGameOver ? 'GAME OVER' : 'PLAYING'}
      <h1>Wordle App</h1>
      {solution}
      <div>
        {guesses.map((guess, i) => {
          const isCurrentGuess = i === guesses.findIndex((val) => val === null);
          return (
            <Word
              word={isCurrentGuess ? currentGuess : guess ?? ''}
              key={i}
              solution={solution}
              isFinal={!isCurrentGuess && guess !== null}
            />
          );
        })}
      </div>
    </main>
  );
}

export default App;
