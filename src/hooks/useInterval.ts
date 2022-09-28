import { RefCallback, SetStateAction, useEffect, useRef } from 'react';

function useInterval(callback: SetStateAction<any>, delay: number) {
  const savedCallback = useRef<RefCallback<HTMLElement> | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  let id = setTimeout(tick, delay);

  function tick() {
    if (savedCallback.current) {
      savedCallback.current(null);
    }

    if (delay !== null) {
      id = setTimeout(tick, delay);

      return () => clearInterval(id);
    }
  }
}

export default useInterval;
