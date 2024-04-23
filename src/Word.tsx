import Letter from "./Letter";

type WordType = {
  word?: string;
  solution: string;
};

export default function Word({ word = "", solution }: WordType) {
  const letters = [];

  for (let i = 0; i < 5; i++) {
    if (solution.includes(word[i]) && solution[i] == word[i]) {
      letters.push(<Letter matching="position" key={i} letter={word[i]} />);
    } else if (solution[i] !== word[i] && solution.includes(word[i])) {
      letters.push(<Letter matching="close" key={i} letter={word[i]} />);
    } else {
      letters.push(<Letter matching="none" key={i} letter={word[i]} />);
    }
  }

  return <div className="word">{letters}</div>;
}
