import { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import AudioPlayer from '~/components/Compose/AudioPlayer';
import DisplayImage from '~/components/Compose/DisplayImage';
import Answers from '~/components/Compose/Answers';
import styles from './Question.module.scss';
import { useEnableMedia } from '~/context/EnableMediaProvider';
import { useQuestions } from '~/context/QuestionsProvider';
import hooks from '~/hooks';
import { useErrorFields } from '~/context/ErrorFieldsProvider';
import CustomTextArea from '~/components/CustomTextArea';

const cx = classNames.bind(styles);

const Question = ({
  data,
  index,
  isEditable,
  isEnableAudio,
  isEnablePhoto,
  quantityOfAnswersPerQuestion,
  historyChanges,
}) => {
  const { t } = useTranslation();
  const {
    isEnableQuestionText,
    displayButtonText,
    onQuestionTextChange,
    questionTextRow,
    onImageUpload,
    onAudioUpload,
  } = useQuestions();

  const questionText = data.question;

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

  const handleOnItemClick = (item) => {
    onQuestionTextChange({ questionId: data.id, questionText: item.title });
    setInputValue(item.title);
  };

  const updateQuestion = (content) => {
    const lines = content
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line !== '');

    const question = lines[0];
    setInputValue(question);
    onQuestionTextChange({ questionId: data.id, questionText: question });
  };

  // Dispatch action only if debouncedValue changes
  useEffect(() => {
    if (debouncedValue !== data.question) {
      onQuestionTextChange({ questionId: data.id, questionText: debouncedValue });
    }
    // eslint-disable-next-line
  }, [debouncedValue]);

  useEffect(() => {
    setInputValue(questionText);
  }, [questionText]);

  return (
    <Accordion defaultActiveKey="0" className={cx('container')} id={data.order ? `question_${data.order}` : ''}>
      <Accordion.Item eventKey="0">
        <Accordion.Header className={cx('header')}>{`${t('question')} #${
          data.order ? data.order : index + 1
        }`}</Accordion.Header>
        <Accordion.Body className={cx('body')}>
          <div className={cx('group')}>
            {/* Photo */}
            {isEnablePhoto && (
              <DisplayImage
                className={cx('photo')}
                imageUrl={data.photo instanceof File ? URL.createObjectURL(data.photo) : data.photo}
                altText={data.question}
                thumbnail
                isEditable={isEditable}
                onImageUpload={(newPhoto) => onImageUpload({ questionId: data.id, photo: newPhoto })}
                photoId={data.id}
              />
            )}
            <div className={cx('wrapper')}>
              {/* Question text */}
              {isEnableQuestionText && (
                <CustomTextArea
                  displayButtonText={displayButtonText}
                  title="question"
                  isEditable={isEditable}
                  historyChanges={historyChanges}
                  rows={questionTextRow}
                  onChange={(e) => setInputValue(e.target.value)}
                  value={inputValue}
                  isError={isError}
                  onHistoryItemClick={handleOnItemClick}
                  onFileChange={handleFileChange}
                  textId={data.id}
                />
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
              audioId={data.id}
              onAudioUpload={(newAudio) => onAudioUpload({ questionId: data.id, audio: newAudio })}
            />
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Question;
