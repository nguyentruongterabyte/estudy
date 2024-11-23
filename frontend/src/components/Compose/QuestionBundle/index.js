import { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import ResizeablePanels from '~/components/ResizeablePanels';
import AudioPlayer from '../AudioPlayer';
import DisplayImage from '../DisplayImage';
import Questions from '../Questions';
import AnswerChangeProvider from '~/context/AnswerChangeProvider';
import QuestionsProvider from '~/context/QuestionsProvider';
import hooks from '~/hooks';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateText,
  updateQuestionText,
  updateAnswer,
  changeCorrectAnswerIndex,
  toggleEnablePhoto,
  updateAudio,
  updatePhoto,
  finished,
} from '~/redux/features/questionBundlesSlice';
import CustomTextArea from '~/components/CustomTextArea';
import styles from './QuestionBundle.module.scss';
import { Form } from 'react-bootstrap';
import { deleteQuestionGroup, toggleAddNew, toggleEdit } from '~/redux/features/questionGroupsSilce';

const cx = classNames.bind(styles);

const fn = () => {};

const QuestionBundle = ({
  isAddNew,
  isEdit,
  groupId,
  className,
  data,
  quote,
  isEnablePhoto,
  isEnableAudio,
  quantityOfAnswersPerQuestion,
  onComplete = fn,
}) => {
  const dispatch = useDispatch();
  const isComplete = useSelector(finished);
  const newQuestionGroup = hooks.useNewQuestionGroup();

  const isEditable = isAddNew || isEdit;

  const [inputValue, setInputValue] = useState(data.text);
  const [photoChecked, setPhotoChecked] = useState(false);
  const debouncedValue = hooks.useDebounce(inputValue, 300);
  const debouncedPhotoChecked = hooks.useDebounce(photoChecked, 150);

  const [selectedAudio, setSelectedAudio] = useState(
    data.audio instanceof File ? URL.createObjectURL(data.audio) : data.audio,
  );
  const [isEmptyAudio, setIsEmptyAudio] = useState(false);

  const [selectedPhoto, setSelectedPhoto] = useState(
    data.photo instanceof File ? URL.createObjectURL(data.photo) : data.photo,
  );
  const [isEmptyPhoto, setIsEmptyPhoto] = useState(false);

  // handle answer change
  const handleAnswerChange = (answer) => {
    dispatch(updateAnswer({ id: data.id, ...answer }));
  };

  // handle correct answer change
  const handleCorrectAnswerChange = (correctAnswer) => {
    console.log(correctAnswer);
    dispatch(changeCorrectAnswerIndex({ id: data.id, ...correctAnswer }));
  };

  // handle audio updload
  const handleAudioUpload = (newAudio) => {
    dispatch(updateAudio({ id: data.id, audio: newAudio }));
    setIsEmptyAudio(false);
    setSelectedAudio(newAudio instanceof File ? URL.createObjectURL(newAudio) : newAudio);
  };

  // handle photo upload
  const handlePhotoUpload = (newPhoto) => {
    dispatch(updatePhoto({ id: data.id, photo: newPhoto }));
    setIsEmptyPhoto(false);
    setSelectedPhoto(newPhoto instanceof File ? URL.createObjectURL(newPhoto) : newPhoto);
  };

  // handle question text change
  const handleQuestionTextChange = (question) => {
    dispatch(updateQuestionText({ id: data.id, ...question }));
  };

  // handle transcript text upload
  const handleTextUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Handle update text
        const textContent = event.target.result;

        // split text to seperate sentence
        const formattedText = textContent
          .split(/(?<=[.!?])\s+/) // seperate by (., !, ?) and space
          .map((sentence) => sentence.trim()) // remove space
          .join(' \n');
        dispatch(updateText({ id: data.id, text: formattedText }));
      };
      reader.readAsText(file);
    }
  };

  // handle history item click
  const handleHistoryItemClick = (item) => {
    console.log(item); // item.title
  };

  // cancel add new
  const handleToggleAddNew = (toggle) => {
    dispatch(toggleAddNew({ toggle }));
    dispatch(deleteQuestionGroup({ groupId: newQuestionGroup.id }));
  };

  useEffect(() => {
    if (debouncedValue !== data.question) {
      dispatch(updateText({ id: data.id, text: debouncedValue }));
    }
    // eslint-disable-next-line
  }, [debouncedValue]);

  useEffect(() => {
    if (debouncedPhotoChecked !== data.isEnablePhoto) {
      dispatch(toggleEnablePhoto({ id: data.id }));
    }
  }, [debouncedPhotoChecked]);

  useEffect(() => {
    if (!data.audio) setIsEmptyAudio(true);
  }, [data.audio]);

  useEffect(() => {
    if (!data.photo) setIsEmptyPhoto(true);
  }, [data.photo]);

  useEffect(() => {
    if (data.text !== inputValue) setInputValue(data.text);
  }, [data.text]);

  return (
    <ResizeablePanels
      className={cx('container', className)}
      leftChildren={
        <div className={cx('left-panel')}>
          {isEnableAudio && (
            <AudioPlayer
              isError={isEditable && isEmptyAudio}
              className={cx('audio')}
              audioId={`bundle_audio_${data.id}`}
              audioLink={selectedAudio || data.audio}
              isEditable={isEditable}
              onAudioUpload={(newAudio) => handleAudioUpload(newAudio)}
              displayButtonText={false}
            />
          )}
          {isEnablePhoto && (
            <Fragment>
              {isEditable && (
                <Form.Check
                  label="Enable Photo"
                  className={cx('photo-enabled-check')}
                  checked={photoChecked}
                  onChange={() => setPhotoChecked((prev) => !prev)}
                  type="switch"
                />
              )}
              {data.isEnablePhoto && (
                <DisplayImage
                  isError={isEditable && isEmptyPhoto}
                  className={cx('photo')}
                  photoId={`bundle_photo_${data.id}`}
                  isEditable={isEditable}
                  imageUrl={selectedPhoto || data.photo}
                  altText={data.photo}
                  onImageUpload={(newPhoto) => handlePhotoUpload(newPhoto)}
                />
              )}
            </Fragment>
          )}

          <CustomTextArea
            displayButtonText={false}
            className={cx('text')}
            title="transcripts"
            isEditable={isEditable}
            historyChanges={[]}
            rows={10}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            isError={false}
            onHistoryItemClick={handleHistoryItemClick}
            onFileChange={handleTextUpload}
            textId={`bundle_text_${data.id}`}
          />
        </div>
      }
      rightChildren={
        <QuestionsProvider
          questionTextRow={4}
          onQuestionTextChange={handleQuestionTextChange}
          isEnableQuestionText={true}
          questions={data.questions}
          displayButtonText={false}
        >
          <AnswerChangeProvider onAnswerChange={handleAnswerChange} onCorrectAnswerChange={handleCorrectAnswerChange}>
            <Questions
              isEnablePhoto={false}
              isEnableAudio={false}
              className={cx('questions')}
              data={data.questions}
              groupId={groupId}
              isAddNew={isAddNew}
              isEdit={isEdit}
              isComplete={isComplete}
              quote={quote}
              onComplete={onComplete}
              onToggleAddNew={handleToggleAddNew}
              onToggleEdit={(toggle) => dispatch(toggleEdit(toggle))}
              quantityOfAnswersPerQuestion={quantityOfAnswersPerQuestion}
            />
          </AnswerChangeProvider>
        </QuestionsProvider>
      }
    />
  );
};

export default QuestionBundle;
