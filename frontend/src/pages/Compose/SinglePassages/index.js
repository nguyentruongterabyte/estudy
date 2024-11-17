import classNames from 'classnames/bind';
import styles from './SinglePassages.module.scss';

const cx = classNames.bind(styles);

const SinglePassages = () => {
  return <div className={cx('container')}>Single Passages</div>;
};

export default SinglePassages;
