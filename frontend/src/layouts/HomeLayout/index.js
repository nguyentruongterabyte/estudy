import classNames from 'classnames/bind';
import styles from './HomeLayout.module.scss';
import Header from './Header';

const cx = classNames.bind(styles);
const HomeLayout = ({ children }) => {
  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('container')}>{children}</div>
    </div>
  );
};

export default HomeLayout;
