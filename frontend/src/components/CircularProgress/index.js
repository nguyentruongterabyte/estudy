import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import classNames from 'classnames/bind';
import 'react-circular-progressbar/dist/styles.css';

import styles from './CircularProgress.module.scss';

const cx = classNames.bind(styles);

const CircularProgress = ({ percentage = 0, className, progressBarStyles, ...props }) => {
  return (
    <div className={cx('container', className)}>
      <CircularProgressbar
        className={cx('progress-bar')}
        styles={buildStyles({ backgroundColor: '#fff', textColor: '#f88', pathColor: '#0a74da', ...progressBarStyles })}
        value={percentage}
        text={`${percentage}%`}
        {...props}
      />
    </div>
  );
};

export default CircularProgress;
