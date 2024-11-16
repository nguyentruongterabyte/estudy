import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';

import hooks from '~/hooks';
import Question from './Question';
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
  removeChangeLogsByField,
} from '~/redux/features/testSlice';

const cx = classNames.bind(styles);

const Questions = ({ onComplete }) => {
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

  // fetch questions data
  const fetchQuestions = async (groupId) => {
    const audio = true;
    const photo = true;
    const questions = await getQuestionsByGroupId(groupId, audio, photo);
    return questions;
  };

  useEffect(() => {
    if (groupId && !isAddNew) {
      fetchQuestions(groupId).then((loadedQuestions) => {
        dispatch(changeQuestions({ questions: loadedQuestions }));
      });
    }
    // eslint-disable-next-line
  }, [groupId]);

  useEffect(() => {
    if (isAddNew) {
      dispatch(
        changeQuestions({
          questions: Array.from({ length: 6 }).map((_, index) => ({
            id: index,
            photo: '',
            audio: '',
            answers: Array.from({ length: 4 }).map((_, answerIndex) => ({ id: answerIndex, answer: '' })),
            correctAnswerIndex: 0,
          })),
        }),
      );
    }
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

    dispatch(toggleComplete({ toggle: complete }));
    setErrorFields(errors);
  };

  // handle on complete button click
  const handleComplete = () => {
    if (isComplete && onComplete) {
      onComplete(questions);
    }
  };

  const handleCancel = () => {
    if (isAddNew) {
      dispatch(toggleAddNew({ toggle: false }));
    }

    if (isEdit) dispatch(toggleEdit({ toggle: false }));
    fetchQuestions(groupId).then((loadedQuestions) => dispatch(changeQuestions({ questions: loadedQuestions })));
    dispatch(removeChangeLogsByField({ field: 'questionGroupName' }));
    setShow(false);
  };

  return (
    <div className={cx('container')}>
      <ErrorFieldsProvider errorFields={errorFields}>
        {Array.isArray(questions) &&
          questions.map((question, index) => (
            <QuestionProvider key={question.id} question={question}>
              <Question data={question} index={index} isEditable={isAddNew || isEdit} />
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
              Cancel
            </Button>
            <Button
              success={isComplete}
              onClick={handleComplete}
              disabled={!isComplete}
              className={cx('complete-button')}
            >
              Complete
            </Button>
          </div>
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
