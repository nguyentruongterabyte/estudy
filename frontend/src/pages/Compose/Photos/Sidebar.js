import { Offcanvas } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const Sidebar = ({ show, title = 'Part 1: Photos', children }) => {
  return (
    <Offcanvas show={show} className={cx('container')} scroll={true} backdrop={false}>
      <Offcanvas.Header className={cx('header')}>
        <Offcanvas.Title className={cx('title')}>{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className={cx('body')}>
        {/* Question group list */}
        {children}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Sidebar;
