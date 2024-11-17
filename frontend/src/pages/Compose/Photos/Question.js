import { Accordion } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';

import AudioPlayer from './AudioPlayer';
import DisplayImage from './DisplayImage';
import Answers from './Answers';
import styles from './Question.module.scss';
import { updateQuestionPhoto, updateQuestionAudio } from '~/redux/features/testSlice';

const cx = classNames.bind(styles);

const Question = ({ data, index, isEditable }) => {
  const dispatch = useDispatch();
  return (
    <Accordion defaultActiveKey="0" className={cx('container')}>
      <Accordion.Item eventKey="0">
        <Accordion.Header className={cx('header')}>Question #{index + 1}</Accordion.Header>
        <Accordion.Body className={cx('body')}>
          <div className={cx('group')}>
            {/* Photo */}
            <DisplayImage
              width={300}
              imageUrl={data.photo instanceof File ? URL.createObjectURL(data.photo) : data.photo}
              altText={data.question}
              thumbnail
              isEditable={isEditable}
              onImageUpload={(newPhoto) => dispatch(updateQuestionPhoto({ questionId: data.id, photo: newPhoto }))}
            />
            {/* Answers/ Editable Answers */}
            <Answers answers={data.answers} isEditable={isEditable} />
          </div>
          {/* Audio */}
          <AudioPlayer
            audioLink={data.audio}
            className={cx('audio')}
            isEditable={isEditable}
            onAudioUpload={(newAudio) => dispatch(updateQuestionAudio({ questionId: data.id, audio: newAudio }))}
          />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Question;
