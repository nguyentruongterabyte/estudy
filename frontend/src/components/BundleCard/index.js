import { Button, ListGroup } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './BundleCard.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleActive } from '~/redux/features/questionBundlesSlice';
import { Fragment, useEffect, useState } from 'react';
import { useUserMode } from '~/context/UserModeProvider';
import { groups } from '~/redux/features/userAnswersSlice';

const cx = classNames.bind(styles);

const BundleCard = ({ data, index }) => {
  const dispatch = useDispatch();

  const { isUserMode } = useUserMode();
  const questions = data.questions;
  const [questionsCompleted, setQuestionCompleted] = useState([]);
  const questionIds = new Set(questions.map((q) => q.id));
  const userAnswers = useSelector(groups);
  const bundleUserAnswers = userAnswers
    .flatMap((user) => user.userAnswers)
    .filter((ua) => questionIds.has(ua.questionId) && ua.userAnswerId);

  // console.log(questions);
  const handleScrollToQuestion = (id) => {
    const targetQuestion = document.getElementById(id);
    if (targetQuestion) {
      targetQuestion.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const completeQuestions = questions.filter((question) => {
      const hasValidQuestion = question.question?.trim() !== '';
      const hasValidAnswers = question.answers.every((answer) => answer.answer?.trim() !== '');
      return hasValidQuestion && hasValidAnswers;
    });

    setQuestionCompleted(completeQuestions);
  }, [questions]);

  return (
    <ListGroup.Item
      onClick={() => dispatch(toggleActive({ index }))}
      className={cx('container', 'me-2')}
      aria-label={`bundle_${data.id}`}
      variant={data.active ? 'info' : ''}
    >
      {questions.map((question, questionIndex) => (
        <Fragment>
          {isUserMode ? (
            <Button
              size="lg"
              variant={
                bundleUserAnswers.some((ua) => ua.questionId === question.id)
                  ? bundleUserAnswers.find((ua) => ua.questionId === question.id).userAnswerId ===
                    question.correctAnswer.answerId
                    ? 'success'
                    : 'danger'
                  : 'outline-success'
              }
              className={cx('question')}
              onClick={() => handleScrollToQuestion(`question_${question.order}`)}
              key={question.id}
            >
              {question.order}
            </Button>
          ) : (
            <Button
              size="lg"
              variant={
                questionsCompleted[questionIndex] ? 'success' : data.active ? 'outline-danger' : 'outline-success'
              }
              className={cx('question')}
              onClick={() => handleScrollToQuestion(`question_${question.order}`)}
              key={question.id}
            >
              {question.order}
            </Button>
          )}
        </Fragment>
      ))}
    </ListGroup.Item>
  );
};

export default BundleCard;
