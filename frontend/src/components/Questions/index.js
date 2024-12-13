import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import logFields from '~/redux/logFields';
import styles from './Questions.module.scss';
import ErrorFieldsProvider from '~/context/ErrorFieldsProvider';
import { useQuestions } from '~/context/QuestionsProvider';
import { getWithExpiry } from '~/utils/localStorageUtils';
import AddButton from '~/components/AddButton';
import CustomAccordion from '../CustomAccordion';
import QuestionHeader from './QuestionHeader';

import AudioPlayer from '~/components/AudioPlayer';
import DisplayImage from '~/components/DisplayImage';
import Answers from '~/components/Answers';
import hooks from '~/hooks';
import { useErrorFields } from '~/context/ErrorFieldsProvider';
import CustomTextArea from '~/components/CustomTextArea';
import { useSelector } from 'react-redux';
import { groups } from '~/redux/features/userAnswersSlice';
import { useUserMode } from '~/context/UserModeProvider';
import QuestionProvider from '~/context/QuestionProvider';

const cx = classNames.bind(styles);

const fn = () => {};

const Questions = ({
  className,
  data = [],
  quantityOfAnswersPerQuestion = 4,
  groupId,
  isAddNew,
  isEdit,
  isEnableAudio,
  isEnablePhoto,
  alwaysOpen,
  activeQuestionIndex = -1,
  onAddNew = fn,
  onToggleComplete = fn,
}) => {
  const { t } = useTranslation();
  const { onAddQuestion } = useQuestions();
  const [errorFields, setErrorFields] = useState({});
  const { isEnableQuestionText } = useQuestions();
  const historyChanges = (getWithExpiry(`editHistory_${groupId}`) || [])
    .filter((history) => history.type === logFields.questionText) // get history changes of question text
    .map((history) => history.changes) // get fiels `changes` each history changes
    .flat(); // merged array

  // validate questions
  const validateQuestions = () => {
    let complete = true;
    const errors = {};

    data.forEach((question, index) => {
      // validate question photo
      if (isEnablePhoto && !question.photo) {
        complete = false;
        errors[`image_${index}`] = 'No image selected';
      }

      // validate question audio
      if (isEnableAudio && !question.audio) {
        complete = false;
        errors[`audio_${index}`] = 'No audio selected';
      }

      question.answers?.forEach((answer, answerIndex) => {
        // Validate answers
        if (!answer.answer || answer.answer.trim() === '') {
          complete = false;
          errors[`answer_${index}_${answerIndex}`] = 'Empty answer';
        }
      });

      // validate question text
      if (isEnableQuestionText && !question.question) {
        complete = false;
        errors[`question_${index}`] = 'Empty question text';
      }
    });

    onToggleComplete(complete);
    setErrorFields(errors);
  };

  useEffect(() => {
    if (isAddNew) {
      onAddNew();
    }
    // eslint-disable-next-line
  }, [isAddNew]);

  // validate questions when change
  useEffect(() => {
    if (Array.isArray(data)) validateQuestions();
    // eslint-disable-next-line
  }, [data]);

  return (
    <div className={cx('container', className)}>
      <ErrorFieldsProvider errorFields={errorFields}>
        <CustomAccordion
          alwaysOpen={alwaysOpen}
          defaultActiveKey={activeQuestionIndex}
          className={cx('accordion')}
          items={data.map((question, index) => ({
            id: `question_${question.order ? question.order : question.id}`,
            header: <QuestionHeader question={question} isAddNew={isAddNew} index={index} />,
            body: (
              <Question
                data={question}
                isEditable={isAddNew || isEdit}
                isEnableAudio={isEnableAudio}
                isEnablePhoto={isEnablePhoto}
                historyChanges={historyChanges}
                quantityOfAnswersPerQuestion={quantityOfAnswersPerQuestion}
              />
            ),
          }))}
        />
      </ErrorFieldsProvider>
      {isAddNew && (
        <AddButton className={cx('add-button')} onClick={() => onAddQuestion()}>
          {t('addQuestion')}
        </AddButton>
      ) }
      <div className={cx('bottom')}></div>
    </div>
  );
};

const Question = ({ data, isEditable, isEnableAudio, isEnablePhoto, quantityOfAnswersPerQuestion, historyChanges }) => {
  const {
    isEnableQuestionText,
    displayButtonText,
    onQuestionTextChange,
    questionTextRow,
    onImageUpload,
    onAudioUpload,
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

  const handleOnItemClick = (item) => {
    onQuestionTextChange({ questionId: data.id, questionText: item.title });
    setInputValue(item.title);
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
    <div className={cx('question')} >
      <QuestionProvider question={data}>
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
                onChange={(content) => setInputValue(content)}
                value={(isDisplayQuestionText || (isUserMode ? isUserSelected : true)) && inputValue}
                isError={isError}
                onHistoryItemClick={handleOnItemClick}
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
      </QuestionProvider>
    </div>
  );
};

export default Questions;
