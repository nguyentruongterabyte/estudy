import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.scss';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Header = ( { title, onBack } ) => {
  return (
    <header className={cx('container')}>
      <button className={cx('back-button')} onClick={onBack}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <h4 className={cx('title')}>{title}</h4>
    </header>
  );
}

export default Header;