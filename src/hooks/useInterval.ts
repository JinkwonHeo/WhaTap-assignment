import { useEffect, useRef } from 'react';

export default function useInterval<t>(
  callback: (() => Promise<t>) | (() => void),
  delay: number | null,
  pollId: number
) {
  const savedCallback = useRef(callback);
  const savedDelay = useRef(delay);
  const savedPollId = useRef(pollId);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    savedDelay.current = delay;
  }, [delay]);

  useEffect(() => {
    savedPollId.current = pollId;
  }, [pollId]);

  useEffect(() => {
    let id: NodeJS.Timeout;

    function tick() {
      if (savedPollId.current != pollId) {
        return;
      }

      const ret = savedCallback.current();

      if (ret instanceof Promise) {
        ret.then(() => {
          if (savedPollId.current != pollId) {
            return;
          }

          if (savedDelay.current !== null) {
            id = setTimeout(tick, savedDelay.current);
          }
        });
      } else {
        if (savedPollId.current != pollId) {
          return;
        }

        if (savedDelay.current !== null) {
          id = setTimeout(tick, savedDelay.current);
        }
      }
    }
    if (savedDelay.current !== null) {
      id = setTimeout(tick, savedDelay.current);

      return () => id && clearTimeout(id);
    }
  }, [delay]);
}
