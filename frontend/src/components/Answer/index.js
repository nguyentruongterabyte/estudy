import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import { ListGroup } from 'react-bootstrap';

import { useErrorFields } from '~/context/ErrorFieldsProvider';
import styles from './Answer.module.scss';
import { useQuestion } from '~/context/QuestionProvider';

import hooks from '~/hooks';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import History from '~/components/History';
import { useAnswerChange } from '~/context/AnswerChangeProvider';
import { useQuestions } from '~/context/QuestionsProvider';
import { useUserMode } from '~/context/UserModeProvider';

const cx = classNames.bind(styles);

const fn = () => {};

const Answer = ({ answer, index, isEditable, historyChanges, isUserAnswer, isUserSelected, onUserSelect = fn }) => {
  const { t } = useTranslation();
  const { questions, onUserSelectAnswer } = useQuestions();
  const { onAnswerChange, onCorrectAnswerChange } = useAnswerChange();
  const [inputValue, setInputValue] = useState(answer.answer);
  const debouncedValue = hooks.useDebounce(inputValue, 300);

  //Answers label A, B, C, D.
  const label = String.fromCharCode(index + 65);

  const question = useQuestion();
  const errorFields = useErrorFields();

  const answerText = questions.find((q) => q.id === question.id).answers[index].answer;

  const isError = isEditable && errorFields && errorFields[`answer_${question.id}_${index}`];

  const { isUserMode, isDisplayAnswerText } = useUserMode();

  // handle on user select answer
  const handleUserSelectAnswer = async () => {
    if (!isUserMode || isUserSelected) return;
    await onUserSelectAnswer(question.id, answer.id);
  };

  // handle on history item click
  const handleOnItemClick = (item) => {
    onAnswerChange({ questionId: question.id, index, answerText: item.title });
  };

  // Dispatch action only if debouncedValue changes
  useEffect(() => {
    if (debouncedValue !== answer.answer) {
      onAnswerChange({ questionId: question.id, index, answerText: debouncedValue });
    }
    // eslint-disable-next-line
  }, [debouncedValue]);

  useEffect(() => {}, [isUserAnswer]);

  useEffect(() => {
    setInputValue(answerText);
  }, [answerText]);
  return (
    <ListGroup.Item
      onClick={handleUserSelectAnswer}
      className={cx('container', {
        correct: isUserMode
          ? isUserSelected && question.correctAnswer?.answerId === answer.id
          : question.correctAnswer?.answerId === answer.id || index === question.correctAnswerIndex,
        incorrect: isUserMode ? isUserAnswer && question.correctAnswer?.answerId !== answer.id : false,
        error: isError,
      })}
    >
      <strong className={cx('label')}>{label}. </strong>
      {isUserMode ? (
        // user mode
        <Fragment>
          {isDisplayAnswerText ? <span>{answer.answer}</span> : isUserSelected && <span>{answer.answer}</span>}
        </Fragment>
      ) : (
        // editor mode
        <Fragment>
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
              {historyChanges.length > 0 && (
                <History
                  onItemClick={handleOnItemClick}
                  className={cx('history')}
                  items={historyChanges.map((history) => {
                    return {
                      title: history.oldValue,
                      icon: faClockRotateLeft,
                    };
                  })}
                />
              )}
              {/* Radio button choose correct answer */}
              <input
                type="radio"
                name={`correctAnswer-${question.id}`}
                checked={question.correctAnswerIndex === index}
                onChange={() => onCorrectAnswerChange({ questionId: question.id, index: index })}
                className={cx('correct-answer-radio')}
              />
            </div>
          ) : (
            <span>{answer.answer}</span>
          )}
        </Fragment>
      )}
    </ListGroup.Item>
  );
};

export default Answer;