type LetterType = {
  letter: string;
  isFinal: boolean;
  isActive: boolean;
  matching: "none" | "position" | "close";
};

export default function Letter({
  letter,
  isFinal,
  isActive,
  matching,
}: LetterType) {
  let className = "letter";

  if (isActive) {
    className += " active";
  }

  if (isFinal) {
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
  }

  return <span className={className}>{letter}</span>;
}
