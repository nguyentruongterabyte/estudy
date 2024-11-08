import classNames from 'classnames/bind';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

import styles from '~/layouts/Header.module.scss';
import config from '~/config';
import hooks from '~/hooks';
import LanguageSelector from '~/components/LanguageSelector';
import navigationItems from './navigationItems';
import NavigationMenu from '~/components/NavigationMenu';
import NavbarBrand from '~/components/NavbarBrand';
import ProfileMenu from '~/components/ProfileMenu';
import profileMenuItems from './profileMenuItems';

const cx = classNames.bind(styles);

const Header = () => {
  const { auth } = hooks.useAuth();
  const { t } = useTranslation();
  const logout = hooks.useLogout();

  const navList =
    auth.currentRole === config.roles.admin
      ? navigationItems.admin
      : auth.currentRole === config.roles.editor
      ? navigationItems.editor
      : navigationItems.user;

  const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
      case 'logout':
        logout();
        break;
      case 'viewProfile':
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
                <ProfileMenu items={profileMenuItems} handleMenuChange={handleMenuChange} />
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
