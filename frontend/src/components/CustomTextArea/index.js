import { faClockRotateLeft, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Fragment } from 'react';
import classNames from 'classnames/bind';

import styles from './CustomTextArea.module.scss';
import History from '../History';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

const CustomTextArea = ( {
  displayButtonText = true,
  title = 'question',
  isEditable,
  historyChanges = [],
  rows = 1,
  onChange,
  value,
  isError = false,
  onHistoryItemClick,
  onFileChange,
  textId,
  className
} ) => {
  const { t } = useTranslation();
  return (
    <Form.Group className={cx('container', 'mb-3', className)} controlId="exampleForm.ControlTextarea1">
      <Form.Label>{t(title)}</Form.Label>
      <Form.Control
        onChange={onChange}
        value={value}
        size="lg"
        as="textarea"
        rows={rows}
        readOnly={!isEditable}
        className={cx('text', { error: isError })}
      />
      {isEditable && (
        <Fragment>
          {historyChanges.length > 0 && (
            <History
              onItemClick={onHistoryItemClick}
              className={cx('history')}
              items={historyChanges.map((history) => {
                return {
                  title: history.oldValue,
                  icon: faClockRotateLeft,
                };
              })}
            />
          )}
          <span
            onClick={() => document.getElementById(`text_file_${textId}`).click()}
            
            className={cx('upload-text-button')}
          >
            <FontAwesomeIcon icon={ faFileLines} />
            {displayButtonText && t('uploadTextFile')}
          </span>
          <input
            style={{ display: 'none' }}
            accept=".txt"
            type="file"
            id={`text_file_${textId}`}
            onChange={onFileChange}
          />
        </Fragment>
      )}
    </Form.Group>
  );
};

export default CustomTextArea;
