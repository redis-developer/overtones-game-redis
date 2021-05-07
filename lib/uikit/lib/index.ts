export const getSymbolForKey = (key: string) => {
  switch (key) {
    case 'Enter':
      return '↵';
    case 'Alt':
      return '⌥';
    case 'Backspace':
      return '⌫';
    case 'Shift':
      return '⇧';
    case ' ':
      return 'Space';
    default:
      return key;
  }
};
