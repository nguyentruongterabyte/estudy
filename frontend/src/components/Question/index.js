import { useEffect, useState } from 'react';
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
import { useSelector } from 'react-redux';
import { groups } from '~/redux/features/userAnswersSlice';
import { useUserMode } from '~/context/UserModeProvider';
import QuestionProvider from '~/context/QuestionProvider';

const cx = classNames.bind(styles);

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
    <div className={cx('container')}>
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

export default Question;
