import classNames from 'classnames/bind';
import styles from './TextCompletion.module.scss';

const cx = classNames.bind(styles);

const TextCompletion = () => {
  return <div className={cx('container')}>Text Completion</div>;
};

export default TextCompletion;
