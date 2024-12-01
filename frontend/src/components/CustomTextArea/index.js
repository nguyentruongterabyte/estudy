import { faClockRotateLeft, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Fragment } from 'react';
import classNames from 'classnames/bind';

import styles from './CustomTextArea.module.scss';
import History from '../History';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

const CustomTextArea = ({
  isEnableUploadButton = true,
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
  className,
  boldWords = ['(1)', '(2)', '(3)', '(4)', 'Q1', 'Q2', 'Q3', 'Q4'],
}) => {
  const { t } = useTranslation();

  const highlightWords = (text, wordsToBold) => {
    const escapedWords = wordsToBold.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`(${escapedWords.join('|')})`, 'g');
    return text.replace(regex, '<b>$1</b>');
  };

  const convertNewLineToBr = (text) => {
    return text.replace(/\n/g, '<br>');
  };

  const convertTabsToSpaces = (text) => {
    return text.replace(/\t/g, '<span style="display:inline-block; width:2em;"></span>');
  };

  const highlightValue = convertTabsToSpaces(convertNewLineToBr(highlightWords(value || '', boldWords)));

  return (
    <Form.Group className={cx('container', 'mb-3', className)} controlId="exampleForm.ControlTextarea1">
      <Form.Label className={cx('title')}>{t(title)}</Form.Label>
      <div className={cx('text-wrapper')}>
        {isEditable ? (
          <Form.Control
            onChange={onChange}
            value={value}
            size="lg"
            as="textarea"
            rows={rows}
            readOnly={!isEditable}
            className={cx('text', { error: isError })}
          />
        ) : (
          <span dangerouslySetInnerHTML={{ __html: highlightValue }} />
        )}
      </div>
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
          {isEnableUploadButton && (
            <Fragment>
              <span
                onClick={() => document.getElementById(`text_file_${textId}`).click()}
                className={cx('upload-text-button')}
              >
                <FontAwesomeIcon icon={faFileLines} />
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
        </Fragment>
      )}
    </Form.Group>
  );
};

export default CustomTextArea;
