import Letter from "./Letter";

type WordType = {
  word: string;
  solution: string;
  isFinal: boolean;
  isActive: boolean;
};

export default function Word({ word, solution, isFinal, isActive }: WordType) {
  const letters = [];

  for (let i = 0; i < 5; i++) {
    const letterProps = {
      isActive,
      isFinal,
      key: i,
      letter: word[i],
    };

    if (solution.includes(word[i]) && solution[i] == word[i]) {
      letters.push(<Letter {...letterProps} matching="position" />);
    } else if (solution[i] !== word[i] && solution.includes(word[i])) {
      letters.push(<Letter {...letterProps} matching="close" />);
    } else {
      letters.push(<Letter {...letterProps} matching="none" />);
    }
  }

  return <div className="word">{letters}</div>;
}
