import { useRef, useCallback } from "react";

export default function useDebouncedCallback<
  T extends (...args: unknown[]) => void
>(callback: T, delay: number = 750) {
  const timeoutRef = useRef<number>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}
