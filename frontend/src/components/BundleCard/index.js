import { Button, ListGroup } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './BundleCard.module.scss';
import { useDispatch } from 'react-redux';
import { toggleActive } from '~/redux/features/questionBundlesSlice';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const BundleCard = ({ data, index }) => {
  const dispatch = useDispatch();

  const questions = data.questions;
  const [questionsCompleted, setQuestionCompleted] = useState([]);

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
        <Button
          size="lg"
          variant={questionsCompleted[questionIndex] ? 'success' : data.active ? 'outline-danger' : 'outline-success'}
          className={cx('question')}
          onClick={() => handleScrollToQuestion(`question_${question.order}`)}
          key={question.id}
        >
          {question.order}
        </Button>
      ))}
    </ListGroup.Item>
  );
};

export default BundleCard;
