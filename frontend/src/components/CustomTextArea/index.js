import { faClockRotateLeft, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Fragment, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './CustomTextArea.module.scss';
import History from '../History';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

import { ContentState } from 'draft-js';
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
  textId,
  className,
  boldWords = ['(1)', '(2)', '(3)', '(4)', 'Q1', 'Q2', 'Q3', 'Q4'],
  isEnableRaw = false,
}) => {
  const { t } = useTranslation();

  const [editorState, setEditorState] = useState(
    // value ? EditorState.createWithContent(ContentState.createFromText(value)) : EditorState.createEmpty(),

    () => {
      if (value) {
        // Nếu value là HTML, sử dụng stateFromHTML để chuyển đổi
        if (value.includes('<')) {
          const contentState = stateFromHTML(value); // Chuyển HTML thành ContentState
          return EditorState.createWithContent(contentState);
        }
        // Nếu value là văn bản thuần túy, tạo ContentState từ text
        return EditorState.createWithContent(ContentState.createFromText(value));
      }
      // Nếu không có value, tạo một EditorState rỗng
      return EditorState.createEmpty();
    },
  );

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);

    const rawContentState = newEditorState.getCurrentContent();
    const htmlContent = stateToHTML(rawContentState);

    if (onChange) onChange(htmlContent); // Gọi prop onChange với chuỗi mới
  };

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target.result;
        const contentState = ContentState.createFromText(result);
        const newEditorState = EditorState.createWithContent(contentState);
        setEditorState(newEditorState); // Cập nhật editorState khi value thay đổi

        onChange(result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <Form.Group className={cx('container', 'mb-3', className)} controlId="exampleForm.ControlTextarea1">
      <Form.Label className={cx('title')}>{t(title)}</Form.Label>
      <div className={cx('text-wrapper')}>
        {isEditable ? (
          <div className={cx('text', { error: isError })}>
            {isEnableRaw ? (
              <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                wrapperClassName="editor-wrapper"
                editorClassName="editor-text-area"
                toolbarClassName="editor-toolbar"
              />
            ) : (
              <Form.Control
                className={cx('input')}
                onChange={(e) => onChange(e.target.value)}
                value={value}
                size="lg"
                as="textarea"
                rows={rows}
                readOnly={!isEditable}
                // className={cx('text', { error: isError })}
              />
            )}
          </div>
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
                onChange={handleFileChange}
              />
            </Fragment>
          )}
        </Fragment>
      )}
    </Form.Group>
  );
};

export default CustomTextArea;
