// NavigationMenu.js
import React, { Fragment } from 'react';
import { NavDropdown, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './NavigationMenu.module.scss';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

const NavigationMenu = ( { navList } ) => {
  
  const { t } = useTranslation();

  return (
    <Fragment>
      {navList.map((item, index) =>
        item.dropdownItems ? (
          <NavDropdown key={index} title={t(item.title)} id={`nav-dropdown-${index}`} className={cx('nav-dropdown')}>
            {item.dropdownItems.map((subItem, subIndex) => (
              <NavDropdown.Item as={Link} to={subItem.href} key={subIndex} className={cx('nav-item')}>
                {t(subItem.title)}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        ) : (
          <Nav.Link as={Link} to={item.href} key={index} className={cx('nav-link')}>
            {t(item.title)}
          </Nav.Link>
        ),
      )}
    </Fragment>
  );
};

export default NavigationMenu;
