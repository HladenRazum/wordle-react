type LetterType = {
  letter: string;
  matching: 'none' | 'position' | 'close';
  isFinal: boolean;
};

export default function Letter({ letter, matching, isFinal }: LetterType) {
  let className = 'letter';

  if (isFinal) {
    switch (matching) {
      case 'position':
        className += ' success';
        break;
      case 'close':
        className += ' alert';
        break;
      default:
        break;
    }
  }

  return <span className={className}>{letter}</span>;
}
