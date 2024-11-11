import classNames from 'classnames/bind';

import styles from './Answer.module.scss';
import { ListGroup } from 'react-bootstrap';
import { useQuestion } from '~/context/QuestionProvider';

const cx = classNames.bind(styles);

const Answer = ({ answer, index }) => {
  const label = String.fromCharCode(index + 65);

  const question = useQuestion();
  return (
    <ListGroup.Item className={cx('answer', { correct: answer.id === question.correctAnswer.answerId })}>
      <strong>{label}. </strong>
      {answer.answer}
    </ListGroup.Item>
  );
};

export default Answer;
