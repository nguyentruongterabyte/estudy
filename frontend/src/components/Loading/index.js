import classNames from 'classnames/bind';
import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

const Loading = () => (
  <div className={cx('wrapper')}>
    <div className={cx('balls')}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default Loading;