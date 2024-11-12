import { Accordion } from 'react-bootstrap';
import classNames from 'classnames/bind';

import QuestionProvider from '~/context/QuestionProvider';
import AudioPlayer from './AudioPlayer';
import DisplayImage from './DisplayImage';
import Answers from './Answers';
import styles from './Question.module.scss';

const cx = classNames.bind(styles);

const Question = ({ data, index, isEditable, onQuestionChange, onAnswerChange, onCorrectAnswerChange }) => {
  return (
    <Accordion defaultActiveKey={0} className={cx('container')}>
      <Accordion.Item eventKey={String(index)}>
        <Accordion.Header className={cx('header')}>Question #{index + 1}</Accordion.Header>
        <Accordion.Body className={cx('body')}>
          <div className={cx('group')}>
            <QuestionProvider question={data}>
              {/* Photo */}
              <DisplayImage
                width={300}
                imageUrl={data.photo}
                altText={data.question}
                thumbnail
                isEditable={isEditable}
                onImageUpload={(newPhoto) => onQuestionChange('photo', newPhoto)}
              />
              {/* Answers/ Editable Answers */}
              <Answers
                answers={data.answers}
                correctAnswerIndex={data.correctAnswerIndex}
                isEditable={isEditable}
                onAnswerChange={onAnswerChange}
                onCorrectAnswerChange={onCorrectAnswerChange}
              />
            </QuestionProvider>
          </div>
          {/* Audio */}
          <AudioPlayer
            audioLink={data.audio}
            className={cx('audio')}
            isEditable={isEditable}
            onAudioUpload={(newAudio) => onQuestionChange('audio', newAudio)}
          />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Question;
