import { Offcanvas } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './Bottombar.module.scss';

const cx = classNames.bind(styles);

const Bottombar = ({title, children, show, className}) => {
  const { t } = useTranslation();
  return (
    <Offcanvas placement='bottom' show={show} className={cx('container', className)} scroll={true} backdrop={false}>
      <Offcanvas.Header className={cx('header')}>
        <Offcanvas.Title className={cx('title')}>{t(title)}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className={cx('body')}>
        {/* Question group list */}
        {children}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Bottombar;
