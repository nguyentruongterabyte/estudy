import classNames from 'classnames/bind';
import {  Navbar } from 'react-bootstrap';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);


const Header = ({ className }) => {

  const classes = cx('header-wrapper', { [className]: className });

  return (
    <div className={cx(classes)}>
      <Navbar expand="lg">
        
      </Navbar>
    </div>
  );
};

export default Header;
