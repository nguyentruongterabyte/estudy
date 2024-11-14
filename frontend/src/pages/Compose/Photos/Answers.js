import classNames from 'classnames/bind';
import styles from './Answers.module.scss';
import Answer from './Answer';
import { ListGroup } from 'react-bootstrap';
import Button from '~/components/Button';
import { Fragment, useState } from 'react';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { useQuestion } from '~/context/QuestionProvider';

const cx = classNames.bind(styles);
const Answers = ({ answers, correctAnswerIndex, isEditable, onAnswerChange, onCorrectAnswerChange }) => {
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

    // Update the answers in the inputs
    answers.forEach((answer, index) => {
      onAnswerChange(index, answer);
    });

    // Choose the correct answer
    onCorrectAnswerChange(correctAnswerIndex);
  };
  return (
    <div className={cx('container')}>
      <ListGroup>
        {answers.map((answer, index) => (
          <Answer
            key={answer.id}
            answer={answer}
            index={index}
            isEditable={isEditable}
            isCorrect={index === correctAnswerIndex}
            onAnswerChange={onAnswerChange}
            onCorrectAnswerChange={() => onCorrectAnswerChange(index)}
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
