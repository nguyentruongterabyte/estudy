import classNames from 'classnames/bind';

import styles from './Answer.module.scss';
import { ListGroup } from 'react-bootstrap';
import { useQuestion } from '~/context/QuestionProvider';

const cx = classNames.bind(styles);

const Answer = ({ answer, index, isEditable, onAnswerChange, onCorrectAnswerChange, isCorrect }) => {
  // A, B, C, D.
  const label = String.fromCharCode(index + 65);

  const question = useQuestion();

  const handleAnswerInputChange = (e) => {
    onAnswerChange(index, e.target.value);
  };

  const handleCorrectAnswerChange = () => {
    onCorrectAnswerChange(index);
  };

  return (
    <ListGroup.Item
      className={cx('container', {
        correct: answer.id === question.correctAnswerIndex || answer.id === question.correctAnswer?.answerId,
      })}
    >
      <strong className={cx('label')}>{label}. </strong>
      {isEditable ? (
        <div className={cx('group')}>
          <input
            type="text" value={ answer.answer } onChange={ handleAnswerInputChange }
            placeholder={ `Answer ${ label }` }
            className={cx('input')}
          />
          {/* Radio button để chọn câu trả lời đúng */}
          <input
            type="radio"
            name={`correctAnswer-${question.id}`}
            checked={isCorrect}
            onChange={handleCorrectAnswerChange}
            className={cx('correct-answer-radio')}
          />
        </div>
      ) : (
        <span>{answer.answer}</span>
      )}
    </ListGroup.Item>
  );
};

export default Answer;
