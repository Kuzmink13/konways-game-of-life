import { useEffect, useRef } from "react";

type IntervalFunction = () => unknown | void;

function useInterval(callback: IntervalFunction, delay: number | null) {
  const intervalRef = useRef<number | null>(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();

    if (typeof delay === "number") {
      intervalRef.current = window.setInterval(tick, delay);

      return () => window.clearInterval(intervalRef.current || undefined);
    }
  }, [delay]);

  return intervalRef;
}

export { useInterval };
