import classNames from 'classnames/bind';
import styles from './Answers.module.scss';
import Answer from './Answer';
import { ListGroup } from 'react-bootstrap';

const cx = classNames.bind(styles);
const Answers = ({answers, correctAnswerIndex, isEditable, onAnswerChange, onCorrectAnswerChange}) => {

  return (
    <ListGroup className={cx('container')}>
      {answers.map((answer, index) => (
        <Answer key={ answer.id }
          answer={ answer }
          index={ index }
          isEditable={ isEditable }
          isCorrect={index=== correctAnswerIndex}
          onAnswerChange={ onAnswerChange }
          onCorrectAnswerChange={() => onCorrectAnswerChange(index)}
        />
      ))}
    </ListGroup>
  );
};

export default Answers;
