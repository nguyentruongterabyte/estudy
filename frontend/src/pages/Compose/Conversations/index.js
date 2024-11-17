import classNames from 'classnames/bind';
import styles from './Conversations.module.scss';

const cx = classNames.bind(styles);

const Conversations = () => {
  return <div className={cx('container')}>Conversations</div>;
};

export default Conversations;
