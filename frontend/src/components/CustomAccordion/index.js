import { Accordion } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './CustomAccordion.module.scss';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const CustomAccordion = ({ className, alwaysOpen = false, items = [], defaultActiveKey }) => {
  const [activeKeys, setActiveKeys] = useState(alwaysOpen ? items.map((_, index) => index) : [defaultActiveKey]);

  const handleAccordionClick = (key) => {
    if (alwaysOpen) {
      setActiveKeys((prevKeys) => (prevKeys.includes(key) ? prevKeys.filter((k) => k !== key) : [...prevKeys, key]));
    } else {
      setActiveKeys([key]);
    }
  };

  useEffect(() => {
    setActiveKeys([defaultActiveKey]);
  }, [ defaultActiveKey ] );
  
  useEffect( () => {
    if ( alwaysOpen ) {
      setActiveKeys(items.map((_, index) => index));
    }
  }, [alwaysOpen])

  return (
    <Accordion activeKey={activeKeys} onSelect={handleAccordionClick} className={cx('container', className)}>
      {items.map((item, index) => (
        <Accordion.Item
          eventKey={index}
          key={item.id ? item.id : index}
          id={item.id ? item.id : `accordion_item${index}`}
        >
          <Accordion.Header className={cx('header')}>{item.header}</Accordion.Header>
          <Accordion.Body className={cx('body')}>{item.body}</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default CustomAccordion;
