type LetterType = {
  letter: string;
  matching: "none" | "position" | "close";
};

export default function Letter({ letter, matching }: LetterType) {
  let className = "letter";

  switch (matching) {
    case "position":
      className += " success";
      break;
    case "close":
      className += " alert";
      break;
    default:
      break;
  }

  return <span className={className}>{letter}</span>;
}
