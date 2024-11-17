import classNames from 'classnames/bind';
import styles from './ShortTalks.module.scss';

const cx = classNames.bind(styles);

const ShortTalks = () => {
  return <div className={cx('container')}>Short Talks</div>;
};

export default ShortTalks;
