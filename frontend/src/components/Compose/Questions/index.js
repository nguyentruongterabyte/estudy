import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';

import hooks from '~/hooks';
import Question from '~/components/Compose/Question';
import QuestionProvider from '~/context/QuestionProvider';
import styles from './Questions.module.scss';
import ErrorFieldsProvider from '~/context/ErrorFieldsProvider';
import Button from '~/components/Button';
import CustomModal from '~/components/CustomModal';
import {
  isAddNew as adding,
  isEdit as editing,
  isComplete as finished,
  changeLog,
  questionList,
  changeQuestions,
  toggleAddNew,
  testGroupId,
  toggleComplete,
  toggleEdit,
} from '~/redux/features/testSlice';
import { useTranslation } from 'react-i18next';
import Quote from '~/components/Quote';
import { useEnableMedia } from '~/context/EnableMediaProvider';
import { useQuestions } from '~/context/QuestionsProvider';

const cx = classNames.bind(styles);

const Questions = ({ onComplete, quantityOfQuestions = 6, quantityOfAnswersPerQuestion = 4, quote }) => {
  const { t } = useTranslation();
  const eventLogs = useSelector(changeLog);
  const questions = useSelector(questionList);
  const isAddNew = useSelector(adding);
  const groupId = useSelector(testGroupId);
  const isEdit = useSelector(editing);
  const isComplete = useSelector(finished);
  const dispatch = useDispatch();
  const { getQuestionsByGroupId } = hooks.useQuestionService();
  const [errorFields, setErrorFields] = useState({});
  const [show, setShow] = useState(false);
  const { isEnablePhoto, isEnableAudio } = useEnableMedia();
  const { isEnableQuestionText } = useQuestions();

  // fetch questions data
  const fetchQuestions = async (groupId) => {
    const questions = await getQuestionsByGroupId(groupId, isEnableAudio, isEnablePhoto);
    return questions;
  };

  useEffect(() => {
    if (groupId && !isAddNew) {
      fetchQuestions(groupId).then((loadedQuestions) => {
        dispatch(
          changeQuestions({
            questions: loadedQuestions.map((question) => ({
              ...question,
              answers: question.answers.map((answer, index) => ({ ...answer, index: index })),
            })),
          }),
        );
      });
    }

    // eslint-disable-next-line
  }, [groupId]);

  useEffect(() => {
    if (isAddNew) {
      dispatch(
        changeQuestions({
          questions: Array.from({ length: quantityOfQuestions }).map((_, index) => ({
            id: index,
            photoId: index,
            audioId: index,
            photo: '',
            audio: '',
            question: '',

            answers: Array.from({ length: quantityOfAnswersPerQuestion }).map((_, answerIndex) => ({
              id: answerIndex,
              index: answerIndex,
              answer: '',
            })),
            correctAnswerIndex: 0,
          })),
        }),
      );
    }
    // eslint-disable-next-line
  }, [isAddNew]);

  // validate questions when change
  useEffect(() => {
    if (Array.isArray(questions)) validateQuestions();
    // eslint-disable-next-line
  }, [questions]);

  // validate questions
  const validateQuestions = () => {
    let complete = true;
    const errors = {};

    questions.forEach((question, index) => {
      question.answers?.forEach((answer, answerIndex) => {
        // Validate answers
        if (!answer.answer || answer.answer.trim() === '') {
          complete = false;
          errors[`answer_${index}_${answerIndex}`] = 'Empty answer';
        }
      });

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

      // validate question text
      if (isEnableQuestionText && !question.question) {
        complete = false;
        errors[`question_${index}`] = 'Empty question text';
      }
    });

    dispatch(toggleComplete({ toggle: complete }));
    setErrorFields(errors);
  };

  // handle on complete button click
  const handleComplete = () => {
    if (isComplete && onComplete) {
      onComplete(questions);
    }
  };

  const handleCancel = async () => {
    await fetchQuestions(groupId).then((loadedQuestions) => dispatch(changeQuestions({ questions: loadedQuestions })));
    if (isAddNew) {
      dispatch(toggleAddNew({ toggle: false }));
    }

    if (isEdit) {
      dispatch(toggleEdit({ toggle: false }));
    }
    setShow(false);

    // if (isEdit) dispatch(toggleEdit({ toggle: false }));
  };

  return (
    <div className={cx('container')}>
      {!isAddNew && !isEdit && questions.length === 0 && <Quote quote={quote} className={cx('quote')} />}
      <ErrorFieldsProvider errorFields={errorFields}>
        {Array.isArray(questions) &&
          questions.map((question, index) => (
            <QuestionProvider key={question.id} question={question}>
              <Question
                data={question}
                index={index}
                isEditable={isAddNew || isEdit}
                quantityOfAnswersPerQuestion={quantityOfAnswersPerQuestion}
              />
            </QuestionProvider>
          ))}
        {(isAddNew || isEdit) && (
          <div className={cx('button-group')}>
            <Button
              onClick={() => {
                if (eventLogs.length === 0) handleCancel();
                else setShow(true);
              }}
              className={cx('cancel-button')}
              outline
            >
              {t('cancel')}
            </Button>
            <Button
              success={isComplete}
              onClick={handleComplete}
              disabled={!isComplete}
              className={cx('complete-button')}
            >
              {t('complete')}
            </Button>
          </div>
        )}
      </ErrorFieldsProvider>
      {/* Modal ask cancel edit */}
      <CustomModal
        title={t('cancelEdit')}
        body={t('confirmCancelEdit')}
        show={show}
        setShow={setShow}
        handleAgreeButtonClick={handleCancel}
      />
    </div>
  );
};

export default Questions;
