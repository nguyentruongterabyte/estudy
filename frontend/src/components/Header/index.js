import classNames from 'classnames/bind';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';

import images from '~/assets/images';
import config from '~/config';
import styles from './Header.module.scss';
import Button from '~/components/Button';
import hooks from '~/hooks';
import Menu from '~/components/Popper/Menu';
import icons from '~/assets/icons';
import NavItem from '~/components/Header/NavItem';

const cx = classNames.bind(styles);

const defaultFn = () => {};

const Header = ({ className, headerSearch }) => {
  const { auth } = hooks.useAuth();
  const logout = hooks.useLogout();
  const navigate = useNavigate();
  const roles = config.roles;
  const accountMenuItems = config.accountMenuItems;

  const Search = headerSearch || undefined;

  const classes = cx('header-wrapper', { [className]: className });

  return (
    <div className={cx(classes)}>
      <Navbar expand="lg">
        
      </Navbar>
    </div>
  );
};

export default Header;
