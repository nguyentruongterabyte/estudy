import classNames from 'classnames/bind';
import styles from './NavbarBrand.module.scss';
import hooks from '~/hooks';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import config from '~/config';
import { faE } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind( styles );

const NavbarBrand = () => {
  const { auth } = hooks.useAuth();

  return (
    <Navbar.Brand className={cx('brand')}>
      <Nav.Link 
        as={Link}
        className={cx('logo-link')}
        to={
          auth.currentRole === config.roles.admin
            ? config.routes.home.admin
            : auth.currentRole === config.roles.editor
            ? config.routes.home.editor
            : auth.currentRole === config.roles.user
            ? config.routes.home.user
            : config.routes.home.default
        }
      >
        <FontAwesomeIcon className={cx('logo')} icon={faE} />
        <span>Study</span>
      </Nav.Link>
    </Navbar.Brand>
  );
}

export default NavbarBrand;