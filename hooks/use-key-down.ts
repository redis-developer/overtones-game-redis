import { useEffect, useRef } from 'react';

const useKeyDown = (key: string, callback: (event: KeyboardEvent) => void) => {
  const callbackRef = useRef(callback);

  if (callback !== callbackRef.current) {
    callbackRef.current = callback;
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) {
        callbackRef.current(event);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [callbackRef, key]);
};

export default useKeyDown;
