import Letter from './Letter';

type WordType = {
  word: string;
  solution: string;
  isFinal: boolean;
};

export default function Word({ word, solution, isFinal }: WordType) {
  const letters = [];

  for (let i = 0; i < 5; i++) {
    if (solution.includes(word[i]) && solution[i] == word[i]) {
      letters.push(
        <Letter
          isFinal={isFinal}
          matching='position'
          key={i}
          letter={word[i]}
        />
      );
    } else if (solution[i] !== word[i] && solution.includes(word[i])) {
      letters.push(
        <Letter isFinal={isFinal} matching='close' key={i} letter={word[i]} />
      );
    } else {
      letters.push(
        <Letter isFinal={isFinal} matching='none' key={i} letter={word[i]} />
      );
    }
  }

  return <div className='word'>{letters}</div>;
}
