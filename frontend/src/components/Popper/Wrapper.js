import classNames from 'classnames/bind';
import styles from './Wrapper.module.scss';

const cx = classNames.bind( styles );

function Wrapper({ children, className }) {
  return <div className={cx('wrapper', 'wrapper-on-mobile', className)}>{children}</div>;
}

export default Wrapper;