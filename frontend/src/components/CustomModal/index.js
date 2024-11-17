import classNames from 'classnames/bind';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import styles from './Modal.module.scss';

const cx = classNames.bind( styles );

const CustomModal = ({ title, body, show, setShow, handleAgreeButtonClick, ...props }) => {
  const { t } = useTranslation();
  return (
    <Modal
      className={cx('container')}
      data-bs-theme="dark"
      aria-labelledby="contained-modal-title-vcenter"
      size="sm"
      centered
      show={show}
      onHide={() => setShow(false)}
      {...props}
    >
      <Modal.Header closeButton>
        <Modal.Title className={cx('title')}>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={cx('body')}>{body}</Modal.Body>
      <Modal.Footer className={cx('footer')}>
        <Button className={cx('close-button')} size="lg" variant="secondary" onClick={() => setShow(false)}>
          {t('close')}
        </Button>
        <Button className={cx('agree-button')} size="lg" variant="primary" onClick={handleAgreeButtonClick}>
          {t('agree')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
