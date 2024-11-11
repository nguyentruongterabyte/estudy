import classNames from 'classnames/bind';
import styles from './Answers.module.scss';
import Answer from './Answer';
import { ListGroup } from 'react-bootstrap';
import { useQuestion } from '~/context/QuestionProvider';

const cx = classNames.bind(styles);
const Answers = () => {
  const question = useQuestion();

  return (
    <ListGroup className={cx('answers')}>
      {question.answers.map((answer, index) => (
        <Answer key={answer.id} answer={answer} index={index} />
      ))}
    </ListGroup>
  );
};

export default Answers;
