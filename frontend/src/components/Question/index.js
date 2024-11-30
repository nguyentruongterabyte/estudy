import { useEffect, useState } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import AudioPlayer from '~/components/AudioPlayer';
import DisplayImage from '~/components/DisplayImage';
import Answers from '~/components/Answers';
import styles from './Question.module.scss';
import { useQuestions } from '~/context/QuestionsProvider';
import hooks from '~/hooks';
import { useErrorFields } from '~/context/ErrorFieldsProvider';
import CustomTextArea from '~/components/CustomTextArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { groups } from '~/redux/features/userAnswersSlice';
import { useUserMode } from '~/context/UserModeProvider';

const cx = classNames.bind(styles);

const Question = ({
  data,
  index,
  isEditable,
  isAddNew,
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
    onDeleteQuestion,
  } = useQuestions();

  const userAnswers = useSelector(groups);
  // console.log('user answers', userAnswers);
  const questionText = data.question;

  const [inputValue, setInputValue] = useState(data.question);
  const errorFields = useErrorFields();
  const debouncedValue = hooks.useDebounce(inputValue, 500);

  const isError = isEditable && errorFields && errorFields[`question_${data.id}`];
  const [userAnswer, setUserAnswer] = useState(null);
  const { isUserMode, isDisplayQuestionText } = useUserMode();
  const [isUserSelected, setIsUserSelected] = useState(false);
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

  const handleDeleteQuestion = (e, questionId) => {
    e.stopPropagation();
    onDeleteQuestion(questionId);
  };

  // Dispatch action only if debouncedValue changes
  useEffect(() => {
    if (debouncedValue !== data.question) {
      onQuestionTextChange({ questionId: data.id, questionText: debouncedValue });
    }
    // eslint-disable-next-line
  }, [debouncedValue]);

  useEffect(() => {
    if (isUserMode) {
      const userAnswer = userAnswers
        .map((ua) => ua.userAnswers)
        .flat()
        .find((ua) => ua.questionId === data.id);
      // console.log('userAnswer', userAnswer);
      setUserAnswer(userAnswer);
      if (userAnswer && userAnswer.userAnswerId) setIsUserSelected(true);
    }
    // eslint-disable-next-line
  }, [userAnswers]);

  useEffect(() => {
    setInputValue(questionText);
  }, [questionText]);

  return (
    <Accordion defaultActiveKey="0" className={cx('container')} id={data.order ? `question_${data.order}` : ''}>
      <Accordion.Item eventKey="0">
        <Accordion.Header className={cx('header')}>
          <span className={cx('order')}>{`${t('question')} #${data.order ? data.order : index + 1}`}</span>
          {isAddNew && (
            <div className={cx('button-group')}>
              <Button
                onClick={(e) => {
                  handleDeleteQuestion(e, data.id);
                }}
                className={cx('delete-button')}
                size="lg"
                variant="danger"
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          )}
        </Accordion.Header>
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
                photoId={`question_photo_${data.id}`}
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
                  value={(isDisplayQuestionText || (isUserMode ? isUserSelected : true)) && inputValue}
                  isError={isError}
                  onHistoryItemClick={handleOnItemClick}
                  onFileChange={handleFileChange}
                  textId={`question_text_${data.id}`}
                />
              )}
              {/* Answers/ Editable Answers */}
              <Answers
                quantityOfAnswersPerQuestion={quantityOfAnswersPerQuestion}
                answers={data.answers}
                isEditable={isEditable}
                userAnswer={userAnswer}
                isUserSelected={isUserSelected}
              />
            </div>
          </div>
          {/* Audio */}
          {isEnableAudio && (
            <AudioPlayer
              audioLink={data.audio}
              className={cx('audio')}
              isEditable={isEditable}
              audioId={`question_audio_${data.id}`}
              onAudioUpload={(newAudio) => onAudioUpload({ questionId: data.id, audio: newAudio })}
            />
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Question;
