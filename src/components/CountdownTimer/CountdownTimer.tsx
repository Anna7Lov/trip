import React, { useState, useEffect } from 'react';
import styles from './CountdownTimer.module.scss';

interface CountdownTimerProps {
  startDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer = ({
  startDate,
}: CountdownTimerProps): JSX.Element => {
  const calculateTimeLeft = (): TimeLeft => {
    const startDateObj = new Date(startDate);
    startDateObj.setHours(0, 0, 0, 0);
    const currentDateObj = new Date();

    const totalSeconds = Math.floor(
      (startDateObj.getTime() - currentDateObj.getTime()) / 1000,
    );

    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (
    timeLeft.seconds <= 0 &&
    timeLeft.minutes <= 0 &&
    timeLeft.hours <= 0 &&
    timeLeft.days <= 0
  ) {
    return <div className={styles.tripStarted}>Have a great trip!</div>;
  }

  return (
    <ul className={styles.timer}>
      {Object.keys(timeLeft).map((key) => (
        <li key={key} className={styles.timer__item}>
          <span className={styles.timer__number}>
            {timeLeft[key as keyof TimeLeft]}
          </span>
          <span className={styles.timer__text}>{key}</span>
        </li>
      ))}
    </ul>
  );
};
