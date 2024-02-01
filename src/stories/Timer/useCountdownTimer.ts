import { useState, useEffect } from "react";

const getShortFormattedTimeString = (timeMs: number) => {
  const time = Math.floor(timeMs / 1000);
  const minutes = Math.floor(time / 60);
  const seconds = ("0" + (time % 60)).slice(-2);

  if (time <= 0) return `0:00`;
  return `${minutes}:${seconds}`;
};

function useCountdownTimer(endTimeStr: number): string {
  const [time, setTime] = useState(endTimeStr);

  useEffect(() => {
    if (time <= 0) return;

    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1000);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [time]);

  return getShortFormattedTimeString(time);
}

export default useCountdownTimer;
