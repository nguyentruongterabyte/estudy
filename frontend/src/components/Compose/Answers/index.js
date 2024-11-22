import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { ListGroup } from 'react-bootstrap';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Answers.module.scss';
import Answer from '~/components/Compose/Answer';
import Button from '~/components/Button';
import { useQuestion } from '~/context/QuestionProvider';
import { initCorrectAnswerIndex, logFields, updateAnswer } from '~/redux/features/testSlice';
import { getWithExpiry } from '~/utils/localStorageUtils';
import { activeGroup } from '~/redux/features/questionGroupsSilce';

const cx = classNames.bind(styles);
const Answers = ({ answers, isEditable, quantityOfAnswersPerQuestion, onAnswerChange }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const question = useQuestion();
  const active = useSelector(activeGroup);
  const groupId = active.id;
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

    // The answers are taken from the first lines
    const answers = lines.slice(0, quantityOfAnswersPerQuestion); // Answers A, B, C, D
    const correctAnswerIndex = parseInt(lines[quantityOfAnswersPerQuestion], 10); // index of correct answer

    dispatch(initCorrectAnswerIndex({ questionId: question.id, index: correctAnswerIndex }));

    // Update the answers in the inputs
    answers.forEach((answer, index) => {
      dispatch(updateAnswer({ questionId: question.id, index: index, answerText: answer }));
    });
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
