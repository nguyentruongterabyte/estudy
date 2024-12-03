import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button, Form } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './NameInputWithButtons.module.scss';
import Tippy from '@tippyjs/react';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

const fn = () => {};

const NameInputWithButtons = ({
  inputValue,
  setInputValue,
  isComplete,
  onCancel = fn,
  onComplete = fn,
  placeholder = 'Enter name',
}) => {
  const { t } = useTranslation();
  return (
    <div className={cx('container')}>
      <Form.Control
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={cx('input-name')}
        size="lg"
        placeholder={placeholder}
      />
      <Tippy placement="bottom" content={t('cancel')}>
        <Button size="lg" onClick={onCancel} className={cx('cancel-button')} variant="outline-danger">
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </Tippy>
      <Tippy placement="bottom" content={t('complete')}>
        <Button
          onClick={onComplete}
          size="lg"
          disabled={!isComplete}
          variant="outline-success"
          className={cx('complete-button')}
        >
          <FontAwesomeIcon icon={faCheck} />
        </Button>
      </Tippy>
    </div>
  );
};

export default NameInputWithButtons;
