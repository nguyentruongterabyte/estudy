import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup } from 'react-bootstrap';

import { useErrorFields } from '~/context/ErrorFieldsProvider';
import styles from './Answer.module.scss';
import { useQuestion } from '~/context/QuestionProvider';
import { updateAnswer, changeCorrectAnswerIndex, questionList } from '~/redux/features/testSlice';
import hooks from '~/hooks';

const cx = classNames.bind(styles);

const Answer = ({ answer, index, isEditable }) => {
  const { t } = useTranslation();

  const [inputValue, setInputValue] = useState(answer.answer);
  const debouncedValue = hooks.useDebounce(inputValue, 300);

  //Answers label A, B, C, D.
  const label = String.fromCharCode(index + 65);

  const question = useQuestion();
  const errorFields = useErrorFields();
  const dispatch = useDispatch();
  const questions = useSelector(questionList);

  const answerText = questions.find((q) => q.id === question.id).answers[index].answer;

  const isError = isEditable && errorFields && errorFields[`answer_${question.id}_${index}`];

  // Dispatch action only if debouncedValue changes
  useEffect(() => {
    if (debouncedValue !== answer.answer) {
      dispatch(updateAnswer({ questionId: question.id, index: index, answerText: debouncedValue }));
    }
  }, [debouncedValue]);

  useEffect(() => {
    setInputValue(answerText);
  }, [answerText]);
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
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
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
