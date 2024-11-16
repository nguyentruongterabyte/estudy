import classNames from 'classnames/bind';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { ListGroup } from 'react-bootstrap';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';

import styles from './Answers.module.scss';
import Answer from './Answer';
import Button from '~/components/Button';
import { useQuestion } from '~/context/QuestionProvider';
import { initCorrectAnswerIndex, updateAnswer } from '~/redux/features/testSlice';

const cx = classNames.bind(styles);
const Answers = ({ answers, isEditable }) => {
  const dispatch = useDispatch();
  const question = useQuestion();

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
    const answers = lines.slice(0, 4); // Answers A, B, C, D
    const correctAnswerIndex = parseInt(lines[4], 10); // index of correct answer
    dispatch(initCorrectAnswerIndex({questionId: question.id, index: correctAnswerIndex }));

    // Update the answers in the inputs
    answers.forEach((answer, index) => {
      dispatch(updateAnswer({ questionId: question.id, answerId: index, answerText: answer }));
    });
  };
  return (
    <div className={cx('container')}>
      <ListGroup>
        {answers.map((answer, index) => (
          <Answer key={answer.id} answer={answer} index={index} isEditable={isEditable} />
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
            Upload Answers Text File
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
