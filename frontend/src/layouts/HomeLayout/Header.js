import classNames from 'classnames/bind';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faE, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

import styles from './HomeLayout.module.scss';
import config from '~/config';
import hooks from '~/hooks';
import LanguageSelector from '~/components/LanguageSelector';
import ProfileMenu from './ProfileMenu';
import { adminNavList, editorNavList, userNavList } from './navigationItems';
import NavigationMenu from './NavigationMenu';

const cx = classNames.bind(styles);

const Header = () => {
  const { auth } = hooks.useAuth();
  const { t } = useTranslation();
  const logout = hooks.useLogout();

  const navList =
    auth.currentRole === config.roles.admin
      ? adminNavList
      : auth.currentRole === config.roles.editor
      ? editorNavList
      : userNavList;

  console.log(auth.currentRole);

  const profileMenu = [
    {
      icon: faAddressCard,
      title: t('view_profile'),
      type: 'viewProfile',
    },
    {
      icon: faRightFromBracket,
      title: t('logout'),
      type: 'logout',
      separate: true,
    },
  ];

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
          <Navbar.Brand className={cx('brand')}>
            <Link
              className={cx('logo-link')}
              to={
                auth.currentRole === config.roles.admin
                  ? config.routes.adminHome
                  : auth.currentRole === config.roles.editor
                  ? config.routes.editorHome
                  : auth.currentRole === config.roles.user
                  ? config.routes.userHome
                  : config.routes.home
              }
            >
              <FontAwesomeIcon className={cx('logo')} icon={faE} />
              <span>Study</span>
            </Link>
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav" className={cx('navbar-collapse')}>
            <Nav className={cx('navbar-nav')}>
              {/* Navigations */}
              <NavigationMenu navList={navList} />

              {/* Change language */}
              <LanguageSelector />
              
              {/* Profile menu / Login button */}
              {auth.accessToken ? (
                <ProfileMenu profileMenu={profileMenu} handleMenuChange={handleMenuChange} />
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
