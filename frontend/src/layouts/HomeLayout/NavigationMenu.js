// NavigationMenu.js
import React from 'react';
import { NavDropdown, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './NavigationMenu.module.scss';

const cx = classNames.bind(styles);

const NavigationMenu = ({ navList }) => {
  return (
    <>
      {navList.map((item, index) =>
        item.dropdownItems ? (
          <NavDropdown key={index} title={item.title} id={`nav-dropdown-${index}`} className={cx('nav-dropdown')}>
            {item.dropdownItems.map((subItem, subIndex) => (
              <NavDropdown.Item as={Link} to={subItem.href} key={subIndex} className={cx('nav-item')}>
                {subItem.title}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        ) : (
          <Nav.Link as={Link} to={item.href} key={index} className={cx('nav-link')}>
            {item.title}
          </Nav.Link>
        ),
      )}
    </>
  );
};

export default NavigationMenu;
