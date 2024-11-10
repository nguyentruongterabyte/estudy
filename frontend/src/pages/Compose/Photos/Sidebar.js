import { ListGroup, Offcanvas } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const Sidebar = ({ show, questionGroups = [], onItemClick }) => {
  return (
    <Offcanvas show={show} className={cx('canvas-container')} scroll={true} backdrop={false}>
      <Offcanvas.Header className={cx('header')}>
        <Offcanvas.Title className={cx('title')}>Part 1: Photos</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className={cx('body')}>
        <ListGroup as="ul" className={cx('list-group')}>
          {questionGroups.map((questionGroup) => (
            <ListGroup.Item
              onClick={() => onItemClick(questionGroup.id)}
              as="li"
              className={cx('list-group-item')}
              key={questionGroup.id}
            >
              {questionGroup.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Sidebar;
