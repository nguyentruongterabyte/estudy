import classNames from 'classnames/bind';
import styles from './Timer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState, useRef } from 'react';
import { faClock } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const fn = () => {};

const Timer = ({ initialSeconds = 0, className, onTimerChange = fn }) => {
  const [secondsElapsed, setSecondsElapsed] = useState(initialSeconds);
  const intervalRef = useRef(null);

  const formatTime = () => {
    const hours = Math.floor(secondsElapsed / 3600);
    const minutes = Math.floor((secondsElapsed % 3600) / 60);
    const seconds = secondsElapsed % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const startTimer = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopTimer();
      } else {
        startTimer();
      }
    };

    // Start timer on mount
    startTimer();

    // Listen for visibility change
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup on unmount
    return () => {
      stopTimer();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    onTimerChange(secondsElapsed);
  }, [secondsElapsed]);

  return (
    <div className={cx('container', className)}>
      <FontAwesomeIcon className={cx('clock-icon')} icon={faClock} />
      <h1 className={cx('timer')}>{formatTime()}</h1>
    </div>
  );
};

export default Timer;
