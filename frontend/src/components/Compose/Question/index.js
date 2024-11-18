import { Fragment, useEffect, useState } from 'react';
import { Accordion, Form } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AudioPlayer from '~/components/Compose/AudioPlayer';
import DisplayImage from '~/components/Compose/DisplayImage';
import Answers from '~/components/Compose/Answers';
import styles from './Question.module.scss';
import { updateQuestionPhoto, updateQuestionAudio, updateQuestionText } from '~/redux/features/testSlice';
import { useEnableMedia } from '~/context/EnableMediaProvider';
import { useQuestions } from '~/context/QuestionsProvider';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import hooks from '~/hooks';
import { useErrorFields } from '~/context/ErrorFieldsProvider';

const cx = classNames.bind(styles);

const Question = ({ data, index, isEditable, quantityOfAnswersPerQuestion }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isEnablePhoto, isEnableAudio } = useEnableMedia();
  const { isEnableQuestionText } = useQuestions();
  const [inputValue, setInputValue] = useState(data.question);
  const errorFields = useErrorFields();
  const debouncedValue = hooks.useDebounce(inputValue, 300);

  const isError = isEditable && errorFields && errorFields[`question_${data.id}`];

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateQuestion(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const updateQuestion = (content) => {
    const lines = content
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line !== '');

    const question = lines[0];
    setInputValue(question);
    dispatch(updateQuestionText({ questionId: data.id, questionText: question }));
  };

  // Dispatch action only if debouncedValue changes
  useEffect(() => {
    if (debouncedValue !== data.question) {
      dispatch(updateQuestionText({ questionId: data.id, questionText: debouncedValue }));
    }
  }, [debouncedValue]);

  return (
    <Accordion defaultActiveKey="0" className={cx('container')}>
      <Accordion.Item eventKey="0">
        <Accordion.Header className={cx('header')}>{`${t('question')} #${index + 1}`}</Accordion.Header>
        <Accordion.Body className={cx('body')}>
          <div className={cx('group')}>
            {/* Photo */}
            {isEnablePhoto && (
              <DisplayImage
                width={300}
                imageUrl={data.photo instanceof File ? URL.createObjectURL(data.photo) : data.photo}
                altText={data.question}
                thumbnail
                isEditable={isEditable}
                onImageUpload={(newPhoto) => dispatch(updateQuestionPhoto({ questionId: data.id, photo: newPhoto }))}
              />
            )}
            <div className={cx('wrapper')}>
              {/* Question text */}
              {isEnableQuestionText && (
                <Form.Group className={cx('input-group', 'mb-3')} controlId="exampleForm.ControlTextarea1">
                  <Form.Label>{t('question')}</Form.Label>
                  <Form.Control
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                    size="lg"
                    as="textarea"
                    rows={1}
                    readOnly={!isEditable}
                    className={cx('text', { error: isError })}
                  />
                  {isEditable && (
                    <Fragment>
                      <Button
                        onClick={() => document.getElementById(`question_text_file_${data.id}`).click()}
                        leftIcon={faFileLines}
                        primary
                        className={cx('upload-text-question')}
                      >
                        {t('uploadTextFile')}
                      </Button>
                      <input
                        style={{ display: 'none' }}
                        accept=".txt"
                        type="file"
                        id={`question_text_file_${data.id}`}
                        onChange={handleFileChange}
                      />
                    </Fragment>
                  )}
                </Form.Group>
              )}
              {/* Answers/ Editable Answers */}
              <Answers
                quantityOfAnswersPerQuestion={quantityOfAnswersPerQuestion}
                answers={data.answers}
                isEditable={isEditable}
              />
            </div>
          </div>
          {/* Audio */}
          {isEnableAudio && (
            <AudioPlayer
              audioLink={data.audio}
              className={cx('audio')}
              isEditable={isEditable}
              onAudioUpload={(newAudio) => dispatch(updateQuestionAudio({ questionId: data.id, audio: newAudio }))}
            />
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Question;
