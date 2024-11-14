import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import hooks from '~/hooks';
import { useQuestionGroups } from '~/context/QuestionGroupsProvider';
import Question from './Question';
import QuestionProvider from '~/context/QuestionProvider';
import styles from './Questions.module.scss';
import ErrorFieldsProvider from '~/context/ErrorFieldsProvider';
import Button from '~/components/Button';
import CustomModal from '~/components/CustomModal';

const cx = classNames.bind(styles);

const Questions = ({ onComplete }) => {
  const { getQuestionsByGroupId } = hooks.useQuestionService();
  const { groupId, isAddNew, setIsAddNew } = useQuestionGroups();
  const [questions, setQuestions] = useState([]);
  const [isComplete, setIsComplete] = useState(true);
  const [errorFields, setErrorFields] = useState({});
  const [show, setShow] = useState(false);

  // Retain a copy of the original state of questions
  const initialQuestions = useRef([]);

  // fetch questions data
  const fetchQuestions = async (groupId) => {
    const audio = true;
    const photo = true;
    const questions = await getQuestionsByGroupId(groupId, audio, photo);
    return questions;
  };

  useEffect(() => {
    if (groupId) {
      fetchQuestions(groupId).then((loadedQuestions) => {
        setQuestions(loadedQuestions);
        initialQuestions.current = JSON.stringify(loadedQuestions); // Store the original copy
      });
    }
    // eslint-disable-next-line
  }, [groupId]);

  useEffect(() => {
    if (isAddNew) {
      setQuestions(
        Array.from({ length: 6 }).map((_, index) => ({
          id: index,
          photo: null,
          audio: null,
          answers: Array.from({ length: 4 }).map((_, answerIndex) => ({ id: answerIndex, answer: '' })),
          correctAnswerIndex: 0,
        })),
      );
    }
  }, [isAddNew]);

  // validate questions when change
  useEffect(() => {
    validateQuestions();
    // eslint-disable-next-line
  }, [questions]);

  // check the difference
  const isQuestionsChanged = useCallback(() => {
    return JSON.stringify(questions) !== initialQuestions.current;
  }, [questions]);

  // validate questions
  const validateQuestions = () => {
    let complete = true;
    const errors = {};

    questions.forEach((question, index) => {
      question.answers?.forEach((answer, answerIndex) => {
        if (!answer.answer || answer.answer.trim() === '') {
          complete = false;
          errors[`answer_${index}_${answerIndex}`] = 'Empty answer';
        }
      });

      if (!question.photo) {
        complete = false;
        errors[`image_${index}`] = 'No image selected';
      }

      if (!question.audio) {
        complete = false;
        errors[`audio_${index}`] = 'No audio selected';
      }
    });

    setIsComplete(complete);
    setErrorFields(errors);
  };

  // handle question change
  const handleQuestionChange = (index, field, value) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
      return updatedQuestions;
    });
  };

  // handle answer change
  const handleAnswerChange = (questionIndex, answerIndex, value) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].answers[answerIndex].answer = value;
      return updatedQuestions;
    });
  };

  // handle correct answer change
  const handleCorrectAnswerChange = (questionIndex, answerIndex) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].correctAnswerIndex = answerIndex;
      return updatedQuestions;
    });
  };

  // handle on complete button click
  const handleComplete = () => {
    if (isComplete && onComplete) {
      onComplete(questions);
    }
  };

  const handleCancel = () => {
    setIsAddNew(false);
    fetchQuestions(groupId).then((loadedQuestions) => setQuestions(loadedQuestions));
    setShow(false);
  };

  return (
    <div className={cx('container')}>
      <ErrorFieldsProvider errorFields={errorFields}>
        {Array.isArray(questions) &&
          questions.map((question, index) => (
            <QuestionProvider key={question.id} question={question}>
              <Question
                data={question}
                index={index}
                isEditable={isAddNew}
                onQuestionChange={(field, value) => handleQuestionChange(index, field, value)}
                onAnswerChange={(answerIndex, value) => handleAnswerChange(index, answerIndex, value)}
                onCorrectAnswerChange={(answerIndex) => handleCorrectAnswerChange(index, answerIndex)}
              />
            </QuestionProvider>
          ))}
        {isAddNew ? (
          <div className={cx('button-group')}>
            <Button onClick={() => setShow(true)} className={cx('cancel-button')} outline>
              Cancel
            </Button>
            <Button
              success={isComplete}
              onClick={ handleComplete } disabled={ !isComplete } className={ cx( 'complete-button' ) }>
              Complete
            </Button>
          </div>
        ) : (
          <Fragment />
        )}
      </ErrorFieldsProvider>
      {/* Modal ask cancel edit */}
      <CustomModal
        title="Cancel Edit"
        body="Are you sure cancel edit"
        show={show}
        setShow={setShow}
        handleAgreeButtonClick={handleCancel}
      />
    </div>
  );
};

export default Questions;
