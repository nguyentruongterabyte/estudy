import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { ListGroup } from 'react-bootstrap';
import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import logFields from '~/redux/logFields';
import styles from './Answers.module.scss';
import Button from '~/components/Button';
import { useQuestion } from '~/context/QuestionProvider';
import { getWithExpiry } from '~/utils/localStorageUtils';
import { activeGroup } from '~/redux/features/questionGroupsSilce';
import { useAnswerChange } from '~/context/AnswerChangeProvider';
import { useQuestions } from '~/context/QuestionsProvider';
import CustomTextArea from '../CustomTextArea';
import hooks from '~/hooks';
import { useUserMode } from '~/context/UserModeProvider';
import { useErrorFields } from '~/context/ErrorFieldsProvider';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import History from '~/components/History';

const cx = classNames.bind(styles);

const Answers = ({ answers, isEditable, quantityOfAnswersPerQuestion, userAnswer, isUserSelected }) => {
  const { t } = useTranslation();
  const question = useQuestion();

  const [inputValue, setInputValue] = useState(question.correctAnswer?.explain || '');
  const debouncedValue = hooks.useDebounce(inputValue, 300);
  const { isEnableExplainText, onExplainTextChange } = useQuestions();
  const active = useSelector(activeGroup);
  const groupId = active.id;
  const { isUserMode } = useUserMode();
  const { onAnswerChange, onCorrectAnswerChange } = useAnswerChange();
  const historyChanges = (getWithExpiry(`editHistory_${groupId}`) || [])
    .filter((history) => history.type === logFields.answer) // get history changes of answers
    .map((history) => history.changes) // get fiels `changes` each history changes
    .flat(); // merged array
  // console.log(historyChanges);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateAnswers(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const updateAnswers = (content) => {
    const lines = content
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line !== '');

    if (lines.length < quantityOfAnswersPerQuestion) return;

    // The answers are taken from the first lines
    const answers = lines.slice(0, quantityOfAnswersPerQuestion); // Answers A, B, C, D
    const correctAnswerIndex = parseInt(lines[quantityOfAnswersPerQuestion], 10); // index of correct answer
    // Update the answers in the inputs
    answers.forEach((answer, index) => {
      onAnswerChange({ questionId: question.id, index: index, answerText: answer });
    });
    // update correct answer
    onCorrectAnswerChange({ questionId: question.id, index: correctAnswerIndex });
  };

  useEffect(() => {
    if (debouncedValue !== question.correctAnswer.explain) {
      onExplainTextChange({ questionId: question.id, explainText: debouncedValue });
    }
    // eslint-disable-next-line
  }, [debouncedValue]);

  useEffect(() => {
    if (question.correctAnswer) setInputValue(question.correctAnswer.explain);
    // eslint-disable-next-line
  }, [question.correctAnswer]);

  return (
    <div className={cx('container')}>
      <div className={cx('answer-group')}>
        <ListGroup className={cx('group')}>
          {answers.map((answer, index) => (
            <Answer
              key={answer.id}
              historyChanges={historyChanges.filter((history) => history.answerId === answer.id)}
              answer={answer}
              index={index}
              isEditable={isEditable}
              onAnswerChange={onAnswerChange}
              isUserAnswer={userAnswer && userAnswer.userAnswerId === answer.id}
              isUserSelected={isUserSelected}
            />
          ))}
        </ListGroup>

        {isEnableExplainText &&
          (!isUserMode || (isUserMode && isUserSelected && question?.correctAnswer?.explain.trim() !== '')) && (
            <CustomTextArea
              className={cx('explain')}
              value={inputValue}
              onChange={(content) => setInputValue(content)}
              title="transcripts"
              isEditable={isEditable}
              rows={4}
              textId={`explain_${question.id}`}
              boldWords={answers.map((answer) => answer.answer)}
            />
          )}
      </div>
      {isEditable ? (
        <Fragment>
          <Button
            onClick={() => document.getElementById(`text_file_${question.id}`).click()}
            leftIcon={faFileLines}
            primary
            className={cx('upload-text-answers')}
          >
            {t('uploadAnswersTextFile')}
          </Button>
          <input
            style={{ display: 'none' }}
            accept=".txt"
            type="file"
            id={`text_file_${question.id}`}
            onChange={handleFileChange}
          />
        </Fragment>
      ) : (
        <Fragment />
      )}
    </div>
  );
};

const Answer = ({ answer, index, isEditable, historyChanges, isUserAnswer, isUserSelected }) => {
  const { t } = useTranslation();
  const { questions, onUserSelectAnswer } = useQuestions();
  const { onAnswerChange, onCorrectAnswerChange } = useAnswerChange();
  const [inputValue, setInputValue] = useState(answer.answer);
  const debouncedValue = hooks.useDebounce(inputValue, 300);
  const [isProcessing, setIsProcessing] = useState(false);

  //Answers label A, B, C, D.
  const label = String.fromCharCode(index + 65);

  const question = useQuestion();
  const errorFields = useErrorFields();

  const answerText = questions.find((q) => q.id === question.id).answers[index].answer;

  const isError = isEditable && errorFields && errorFields[`answer_${question.id}_${index}`];

  const { isUserMode, isDisplayAnswerText } = useUserMode();

  // handle on user select answer
  const handleUserSelectAnswer = async () => {
    if (!isUserMode || isUserSelected || isProcessing) return;

    setIsProcessing(true); // Khóa thao tác
    try {
      await onUserSelectAnswer(question.id, answer.id);
    } catch (error) {
      console.error('Error in handleUserSelectAnswer:', error);
    } finally {
      setIsProcessing(false); // Mở khóa thao tác
    }
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
      disabled={isProcessing}
      onClick={handleUserSelectAnswer}
      className={cx('answer', {
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
        <span className={cx('text')}>
          {isDisplayAnswerText ? <span>{answer.answer}</span> : isUserSelected && <span>{answer.answer}</span>}
        </span>
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
            <span className={cx('text')}>{answer.answer}</span>
          )}
        </Fragment>
      )}
    </ListGroup.Item>
  );
};

export default Answers;
