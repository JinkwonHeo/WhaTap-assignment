import { RefCallback, SetStateAction, useEffect, useRef } from 'react';

function useInterval(callback: SetStateAction<any>, delay: number) {
  const savedCallback = useRef<RefCallback<HTMLElement> | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current(null);
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);

      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
