type LetterType = {
  letter: string;
  isFinal: boolean;
  isActive: boolean;
  matching: 'none' | 'position' | 'close';
  size?: 'xs' | 'normal';
};

export default function Letter({
  letter,
  isFinal,
  isActive,
  matching,
  size = 'normal',
}: LetterType) {
  let className = 'letter';

  if (size === 'xs') {
    className += ' xs';
  }

  if (isActive) {
    className += ' active';
  }

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
