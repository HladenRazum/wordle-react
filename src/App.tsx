import { useEffect, useState } from 'react';
import Word from './Word';
import { WORDS } from './words';
import Letter from './Letter';

const lettersRegex = /^[a-zA-Z]+$/;
const solution = WORDS[Math.floor(Math.random() * WORDS.length)];
const usedLettersSet: Set<string> = new Set();
const alphabet = [...Array(26).keys()].map((i) => String.fromCharCode(i + 65));

type MatchingType = 'close' | 'position' | 'none';

const isMatching = (letter: string, solution: string): MatchingType => {
  letter = letter.toUpperCase();
  console.log(solution, letter);

  let result = '';
  for (let i = 0; i < 5; i++) {
    if (solution.includes(letter) && solution[i] == letter) {
      result = 'position';
    } else if (solution[i] !== letter && solution.includes(letter)) {
      result = 'close';
    } else {
      result = 'none';
    }
  }
  return result as MatchingType;
};

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
  const [guesses, setGuesses] = useState(Array(6).fill(null));
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
        if (currentGuess.length < 5) {
          return;
        }

        const newGuesses = [...guesses];
        newGuesses[currentGuessIndex] = currentGuess;
        setGuesses(newGuesses);

        if (currentGuessIndex !== 5) {
          setCurrentGuess('');
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

      if (e.key === 'Backspace') {
        setCurrentGuess((guess) => guess.slice(0, -1));
      } else {
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
    <main className='Wordle'>
      <h1 className='title'>Wordle App</h1>
      <p className='subtitle'>Try to guess the word</p>
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
          The word was: <span className='solution'>{solution}</span>
        </p>
      )}
      <p className='used-letters_title'>Used letters </p>
      <ul className='info'>
        {alphabet.map((l) => (
          <Letter
            key={l}
            matching='none'
            letter={l}
            isActive={false}
            isFinal={true}
            size='xs'
          />
        ))}
      </ul>
    </main>
  );
}

export default App;
