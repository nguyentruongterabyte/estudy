import { faArrowRight, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import styles from './Header.module.scss';

const cx = classNames.bind( styles );

const Header = ({ setShow, show }) => {
  const handleToggleCanvas = () => {
    setShow((prev) => !prev);
  };

  return (
    <div className={ cx( 'container' ) }>
      <FontAwesomeIcon className={cx('canvas-button')} icon={show ? faBars : faArrowRight} onClick={handleToggleCanvas} />
    </div>
  );
};

export default Header;
