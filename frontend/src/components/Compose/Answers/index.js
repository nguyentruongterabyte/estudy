import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { ListGroup } from 'react-bootstrap';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import logFields from '~/redux/logFields';
import styles from './Answers.module.scss';
import Answer from '~/components/Compose/Answer';
import Button from '~/components/Button';
import { useQuestion } from '~/context/QuestionProvider';
import { getWithExpiry } from '~/utils/localStorageUtils';
import { activeGroup } from '~/redux/features/questionGroupsSilce';
import { useAnswerChange } from '~/context/AnswerChangeProvider';

const cx = classNames.bind(styles);
const Answers = ({ answers, isEditable, quantityOfAnswersPerQuestion }) => {
  const { t } = useTranslation();
  const question = useQuestion();
  const active = useSelector(activeGroup);
  const groupId = active.id;
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
  return (
    <div className={cx('container')}>
      <ListGroup className={cx('group')}>
        {answers.map((answer, index) => (
          <Answer
            key={answer.id}
            historyChanges={historyChanges.filter((history) => history.answerId === answer.id)}
            answer={answer}
            index={index}
            isEditable={isEditable}
            onAnswerChange={onAnswerChange}
          />
        ))}
      </ListGroup>
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
