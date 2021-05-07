import { useEffect } from 'react';

/**
 * TODO TEST ME
 */

const highlightElement = (elementId: string, key: string) => {
  const el = document.getElementById(elementId);

  if (el) {
    el.className += ` ${key}`;
  }
};

const removeHighlight = (elementId: string, key: string) => {
  const el = document.getElementById(elementId);
  if (el) {
    el.classList.remove(key);
  }
};

const highlightRow = (rowId: string) => {
  highlightElement(rowId, 'highlighted');
  setTimeout(() => {
    removeHighlight(rowId, 'highlighted');
  }, 1000);
};

// TODO This should only be for notations as it's quite complex
// and has logic that only applies to the interval/notation interface
const useDetectKeySequence = (
  sequence: string,
  callback: VoidFunction,
  isIntervalInterface: boolean
) => {
  const keystrokeDelay = 1000;

  // TODO yeahhhh.........
  sequence = sequence.toLowerCase();
  sequence = sequence.replace('#', 's');
  sequence = sequence.replace('##', 's');

  let state = {
    buffer: [],
    lastKeyTime: Date.now(),
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const currentTime = Date.now();
      let buffer = [];

      if (key.length === 1) {
        if (currentTime - state.lastKeyTime > keystrokeDelay) {
          buffer = [key];
        } else {
          buffer = [...state.buffer, key];
        }
      }

      // eslint-disable-next-line
      state = { buffer, lastKeyTime: currentTime };

      if (isIntervalInterface) {
        if (buffer.join('') === 'x') {
          highlightRow('notation-row-doublesharp');
          highlightRow('notation-row-sharp');
        }
        if (buffer.join('') === 's') {
          highlightRow('notation-row-sharp');
        }
        if (buffer.join('') === 'b') {
          highlightRow('notation-row-flat');
        }
        if (buffer.join('') === 'bb') {
          highlightRow('notation-row-flat');
          highlightRow('notation-row-doubleflat');
        }
      }

      if (buffer.join('').trim() === sequence) {
        // trigger some visual feedback
        highlightElement(`token-${sequence}`, 'active');
        setTimeout(() => {
          removeHighlight(`token-${sequence}`, 'active');
        }, 100);

        removeHighlight('notation-row-sharp', 'highlighted');
        removeHighlight('notation-row-flat', 'highlighted');

        if (isIntervalInterface) {
          return callback();
        } else {
          if (key === ' ') {
            callback();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback, sequence]);
};

export default useDetectKeySequence;
