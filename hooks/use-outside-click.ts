import { useEffect, useRef } from 'react';

const useOutsideClick = (
  ref: HTMLElement | null,
  callback: (event: MouseEvent) => void
) => {
  const callbackRef = useRef(callback);

  if (callback !== callbackRef.current) {
    callbackRef.current = callback;
  }

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref?.contains(event.target as HTMLElement)) {
        callbackRef.current(event);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [callbackRef, ref]);
};

export default useOutsideClick;
