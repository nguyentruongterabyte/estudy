import classNames from 'classnames/bind';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faE, faHouse } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

import config from '~/config';
import styles from '~/layouts/Header.module.scss';
import LanguageSelector from '~/components/LanguageSelector';
import NavbarBrand from '~/components/NavbarBrand';

const cx = classNames.bind(styles);

function Header() {
  const { t } = useTranslation();

  return (
    <div className={cx('header-wrapper')}>
      <Navbar expand="lg" className={cx('bg-body-tertiary', 'header-nav')}>
        <Container>
          <NavbarBrand />
          <Navbar.Collapse id="basic-navbar-nav" className={cx('navbar-collapse')}>
            <Nav className={cx('navbar-nav')}>
              {/* Change language */}
              <LanguageSelector />
              <Link to={config.routes.home.default} className={cx('nav-link-item')}>
                <FontAwesomeIcon icon={faHouse} className={cx('nav-icon')} />
                {t('home')}
              </Link>
              {/* Change language */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
