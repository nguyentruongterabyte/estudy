import classNames from 'classnames/bind';

import styles from './Answer.module.scss';
import { ListGroup } from 'react-bootstrap';
import { useQuestion } from '~/context/QuestionProvider';

const cx = classNames.bind( styles );


const Answer = ({answer}) => {

  const question = useQuestion();
  return (
    <ListGroup.Item active={answer.id === question.correctAnswer.answerId}>
      {answer.answer}
    </ListGroup.Item>
  );
};

export default Answer;
