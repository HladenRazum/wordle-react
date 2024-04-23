import { useEffect, useState } from 'react';
import Word from './Word';
import Letter from './Letter';

import { WORDS } from './words';
import { NUM_ATTEMPTS, WORD_LENGTH } from './constants';

const lettersRegex = /^[a-zA-Z]+$/;
const solution = WORDS[Math.floor(Math.random() * WORDS.length)];
const alphabet = [...Array(26).keys()].map((i) => String.fromCharCode(i + 65));
const usedLettersSet: Set<string> = new Set();

const isNotAllowedKey = (key: string) => {
  return (
    !lettersRegex.test(key) ||
    key === 'CapsLock' ||
    key === 'Shift' ||
    key === 'Control' ||
    key === 'Alt' ||
    key === 'Spacebar' ||
    key === 'Escape'
  );
};

function App() {
  const [guesses, setGuesses] = useState(Array(NUM_ATTEMPTS).fill(null));
  const [currentGuess, setCurrentGuess] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [usedLetters, setUsedLetters] = useState<string[]>([]);

  useEffect(() => {
    const handleType = (e: globalThis.KeyboardEvent) => {
      if (isNotAllowedKey(e.key) || isGameOver) {
        return;
      }

      if (e.key === 'Enter') {
        if (currentGuess.length < WORD_LENGTH) {
          return;
        }

        setUsedLetters([...usedLettersSet]);
        const newGuesses = [...guesses];
        newGuesses[currentGuessIndex] = currentGuess;
        setGuesses(newGuesses);

        if (currentGuessIndex !== NUM_ATTEMPTS - 1) {
          setCurrentGuess('');
        }

        const isCorrect = currentGuess === solution;

        if (
          isCorrect ||
          (currentGuessIndex === NUM_ATTEMPTS - 1 &&
            currentGuess.length >= NUM_ATTEMPTS - 1)
        ) {
          setIsGameOver(true);
        }

        setCurrentGuessIndex((index) => {
          return index < NUM_ATTEMPTS - 1 ? index + 1 : index;
        });
      }

      if (e.key === 'Backspace') {
        setCurrentGuess((guess) => guess.slice(0, -1));
      } else {
        if (e.key.length === 1) {
          usedLettersSet.add(e.key.toUpperCase());
        }
        setCurrentGuess((guess) => {
          if (e.key === 'Enter') return guess;
          return guess + e.key.toUpperCase();
        });
      }
    };

    window.addEventListener('keydown', handleType);

    return () => {
      window.removeEventListener('keydown', handleType);
    };
  }, [currentGuess, currentGuessIndex, guesses, isGameOver]);

  return (
    <main className="Wordle">
      <h1 className="title">Wordle</h1>
      <p className="subtitle">Try to guess the word</p>
      <div>
        {guesses.map((guess, i) => {
          const isCurrentGuess = i === currentGuessIndex;
          return (
            <Word
              isActive={isCurrentGuess}
              word={isCurrentGuess ? currentGuess : guess ?? ''}
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
      <p className="used-letters_title">Used letters </p>
      <ul className="info">
        {alphabet.map((l) => (
          <Letter
            key={l}
            matching={usedLetters.includes(l) ? 'close' : 'none'}
            letter={l}
            isActive={false}
            isFinal={true}
            size="xs"
          />
        ))}
      </ul>
    </main>
  );
}

export default App;
