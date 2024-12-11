import classNames from 'classnames/bind';
import styles from './QuestionsCard.module.scss';
import { useSelector } from 'react-redux';
import { questionList } from '~/redux/features/questionsSingleSlice';
import { groups } from '~/redux/features/userAnswersSlice';
import { useUserMode } from '~/context/UserModeProvider';
import { Button } from 'react-bootstrap';
import { Fragment, useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const fn = () => {};

const QuestionsCard = ({ onActiveQuestion = fn }) => {
  const { isUserMode } = useUserMode();
  const questions = useSelector(questionList);
  const questionIds = new Set(questions.map((q) => q.id));
  const [questionsCompleted, setQuestionCompleted] = useState([]);

  const userAnswers = useSelector(groups);
  const singleUserAnsers = userAnswers
    .flatMap((user) => user.userAnswers)
    .filter((ua) => questionIds.has(ua.questionId) && ua.userAnswerId);

  // console.log(questions);
  const handleScrollToQuestion = (id, index) => {
    const targetQuestion = document.getElementById(id);
    if (targetQuestion) {
      targetQuestion.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    onActiveQuestion(index);
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
    <div className={cx('container')}>
      {questions.map((question, questionIndex) => (
        <Fragment key={question.id}>
          {isUserMode ? (
            <Button
              size="lg"
              variant={
                singleUserAnsers.some((ua) => ua.questionId === question.id)
                  ? singleUserAnsers.find((ua) => ua.questionId === question.id).userAnswerId ===
                    question.correctAnswer.answerId
                    ? 'success'
                    : 'danger'
                  : 'outline-success'
              }
              onClick={() => handleScrollToQuestion(`question_${question.id}`, questionIndex)}
              className={cx('question')}
            >
              {questionIndex + 1}
            </Button>
          ) : (
            <Button
              size="lg"
              variant={questionsCompleted[questionIndex] ? 'success' : 'outline-danger'}
              className={cx('question')}
              onClick={() => handleScrollToQuestion(`question_${question.id}`, questionIndex)}
            >
              {questionIndex + 1}
            </Button>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default QuestionsCard;
