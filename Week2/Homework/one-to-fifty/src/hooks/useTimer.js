import { useEffect, useRef, useState } from 'react';

export default function useTimer() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const startedAt = useRef(null);

  useEffect(() => {
    if (!isRunning) return;

    // 횟수를 더하지 않고 시작 시각과의 차이로 측정
    const intervalId = setInterval(() => {
      if (startedAt.current === null) return;
      setElapsedTime((performance.now() - startedAt.current) / 1000);
    }, 10);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  function startTimer() {
    startedAt.current = performance.now();
    setElapsedTime(0);
    setIsRunning(true);
  }

  function stopTimer() {
    if (startedAt.current === null) return null;

    const finalTime = (performance.now() - startedAt.current) / 1000;
    startedAt.current = null;
    setElapsedTime(finalTime);
    setIsRunning(false);
    return finalTime;
  }

  function resetTimer() {
    startedAt.current = null;
    setIsRunning(false);
    setElapsedTime(0);
  }

  return { elapsedTime, startTimer, stopTimer, resetTimer };
}
