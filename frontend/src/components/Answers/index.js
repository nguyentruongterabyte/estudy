import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { ListGroup } from 'react-bootstrap';
import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import logFields from '~/redux/logFields';
import styles from './Answers.module.scss';
import Answer from '~/components/Answer';
import Button from '~/components/Button';
import { useQuestion } from '~/context/QuestionProvider';
import { getWithExpiry } from '~/utils/localStorageUtils';
import { activeGroup } from '~/redux/features/questionGroupsSilce';
import { useAnswerChange } from '~/context/AnswerChangeProvider';
import { useQuestions } from '~/context/QuestionsProvider';
import CustomTextArea from '../CustomTextArea';
import hooks from '~/hooks';
import { useUserMode } from '~/context/UserModeProvider';

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

        {isEnableExplainText && (!isUserMode || (isUserMode && isUserSelected)) && (
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

export default Answers;
