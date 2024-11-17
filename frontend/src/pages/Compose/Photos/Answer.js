import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { ListGroup } from 'react-bootstrap';

import { useErrorFields } from '~/context/ErrorFieldsProvider';
import styles from './Answer.module.scss';
import { useQuestion } from '~/context/QuestionProvider';
import { updateAnswer, changeCorrectAnswerIndex } from '~/redux/features/testSlice';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

const Answer = ({ answer, index, isEditable }) => {
  const { t } = useTranslation();
  // A, B, C, D.
  const label = String.fromCharCode(index + 65);

  const question = useQuestion();
  const errorFields = useErrorFields();
  const dispatch = useDispatch();

  const isError = isEditable && errorFields && errorFields[`answer_${question.id}_${index}`];

  const handleAnswerChange = (e) => {
    dispatch(updateAnswer({ questionId: question.id, answerId: answer.id, answerText: e.target.value }));
  };

  return (
    <ListGroup.Item
      className={cx('container', {
        correct: question.correctAnswer?.answerId === answer.id || index === question.correctAnswerIndex,
        error: isError,
      })}
    >
      <strong className={cx('label')}>{label}. </strong>
      {isEditable ? (
        <div className={cx('group')}>
          <input
            type="text"
            value={answer.answer}
            onChange={handleAnswerChange}
            placeholder={`${t('answer')} ${label}`}
            className={cx('input')}
            id={`answer_${question.id}_${index}`}
          />
          {/* Radio button để chọn câu trả lời đúng */}
          <input
            type="radio"
            name={`correctAnswer-${question.id}`}
            checked={question.correctAnswerIndex === index}
            onChange={() => dispatch(changeCorrectAnswerIndex({ questionId: question.id, answerId: answer.id }))}
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
