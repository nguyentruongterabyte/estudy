import { Accordion } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './CustomAccordion.module.scss';

const cx = classNames.bind(styles);

const CustomAccordion = ({ className, items = [] }) => {
  return (
    <Accordion defaultActiveKey={0} className={cx('container', className)}>
      {items.map((item, index) => (
        <Accordion.Item eventKey={index} key={index}>
          <Accordion.Header className={cx('header')}>{item.header}</Accordion.Header>
          <Accordion.Body className={cx('body')}>{item.body}</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default CustomAccordion;
