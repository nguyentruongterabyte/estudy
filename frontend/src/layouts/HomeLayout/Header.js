import classNames from 'classnames/bind';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

import styles from '~/layouts/Header.module.scss';
import config from '~/config';
import hooks from '~/hooks';
import LanguageSelector from '../LanguageSelector';
import NavigationMenu from '../NavigationMenu';
import NavbarBrand from '../NavbarBrand';
import ProfileMenu from '../ProfileMenu';

const cx = classNames.bind(styles);

const Header = () => {
  const { auth } = hooks.useAuth();
  const { t } = useTranslation();
  const logout = hooks.useLogout();
  const navigate = useNavigate();
  const { clearAll: clearTimersData } = hooks.useSaveData('time_colapsed');

  const navList =
    auth.currentRole === config.roles.admin
      ? config.navigationItems.admin
      : auth.currentRole === config.roles.editor
      ? config.navigationItems.editor
      : auth.currentRole === config.roles.user
      ? config.navigationItems.user
      : [];

  const profileMenu =
    auth.currentRole === config.roles.admin
      ? config.profileMenuItems.admin
      : auth.currentRole === config.roles.editor
      ? config.profileMenuItems.editor
      : config.profileMenuItems.user;

  const handleMenuChange = async (menuItem) => {
    switch (menuItem.type) {
      case 'logout':
        await logout();
        clearTimersData();
        break;
      case 'viewProfile':
        navigate(config.routes.profile);
        break;
      case 'changePassword':
        navigate(config.routes.passwordChanging);
        break;
      case 'learningResult':
        navigate(config.routes.learningResult);
        break;
      default:
        break;
    }
  };
  return (
    <div className={cx('header-wrapper')}>
      <Navbar expand="lg" className={cx('bg-body-tertiary', 'header-nav')}>
        <Container>
          {/* Navbar brand */}
          <NavbarBrand />
          <Navbar.Collapse id="basic-navbar-nav" className={cx('navbar-collapse')}>
            <Nav className={cx('navbar-nav')}>
              {/* Navigations */}
              <NavigationMenu navList={navList} />

              {/* Change language */}
              <LanguageSelector />

              {/* Profile menu / Login button */}
              {auth.accessToken ? (
                <ProfileMenu items={profileMenu} handleMenuChange={handleMenuChange} />
              ) : (
                <Nav.Link as={Link} className={cx('nav-link-item')} to={config.routes.login}>
                  <FontAwesomeIcon icon={faUser} className={cx('nav-icon')} />
                  {t('sign_in')}
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
