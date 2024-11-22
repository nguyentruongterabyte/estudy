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
  updateBundles,
  toggleActive,
  toggleEnablePhoto,
} from '~/redux/features/questionBundlesSlice';
import CustomTextArea from '~/components/CustomTextArea';
import styles from './QuestionBundle.module.scss';
import { Form } from 'react-bootstrap';
import { activeGroup, adding, editing, toggleAddNew, toggleEdit } from '~/redux/features/questionGroupsSilce';

const cx = classNames.bind(styles);

const QuestionBundle = ({ className, data, quote, isEnablePhoto, isEnableAudio }) => {
  const dispatch = useDispatch();

  const isEdit = useSelector(editing);
  const isAddNew = useSelector(adding);

  const active = useSelector( activeGroup );
  const groupId = activeGroup.id;

  const isEditable = isEdit || isAddNew;

  const text = data.text;
  const audio = data.audio.audioLink;

  const [inputValue, setInputValue] = useState(data.text);
  const [photoChecked, setPhotoChecked] = useState(false);
  const debouncedValue = hooks.useDebounce(inputValue, 300);
  const debouncedPhotoChecked = hooks.useDebounce(photoChecked, 150);

  const [isQuestionComplete, setIsQuestionComplete] = useState(false);

  const newBundles = Array.from({ length: 13 }).map((_, bundleIndex) => ({
    active: false,
    id: bundleIndex,
    photo: {
      id: bundleIndex,
      filePath: '',
    },
    audio: {
      id: bundleIndex,
      audioLink: '',
    },
    text: '',
    isEnablePhoto: false,
    questions: Array.from({ length: 3 }).map((_, questionIndex) => ({
      id: questionIndex,
      question: '',
      order: bundleIndex * 3 + questionIndex + 1,
      correctAnswerIndex: 0,
      correctAnswer: { answerId: 0 },
      answers: Array.from({ length: 4 }).map((_, answerIndex) => ({
        id: answerIndex,
        answer: '',
        index: answerIndex,
      })),
    })),
  }));
  // handle answer change
  const handleAnswerChange = (answer) => {
    dispatch(updateAnswer({ id: data.id, ...answer }));
  };

  // handle correct answer change
  const handleCorrectAnswerChange = (correctAnswer) => {
    dispatch(changeCorrectAnswerIndex({ id: data.id, ...correctAnswer }));
  };

  // handle audio updload
  const handleAudioUpload = (newAudio) => {
    console.log(newAudio);
  };

  // handle photo upload
  const handlePhotoUpload = (newPhoto) => {
    console.log(newPhoto);
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
        console.log('text: ', event.target.result);
      };
      reader.readAsText(file);
    }
  };

  // handle history item click
  const handleHistoryItemClick = (item) => {
    console.log(item); // item.title
  };

  const handleBundleQuestionAddNew = () => {};

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
    setInputValue(text);
  }, [text]);

  useEffect(() => {
    setPhotoChecked(data.isEnablePhoto);
  }, [data.isEnablePhoto]);

  useEffect(() => {
    if (isAddNew) {
      dispatch(updateBundles({ bundles: newBundles }));
      dispatch(toggleActive({ index: 0 }));
    }
  }, [isAddNew]);

  return (
    <ResizeablePanels
      className={cx('container', className)}
      leftChildren={
        <div className={cx('left-panel')}>
          {isEnableAudio && (
            <AudioPlayer
              className={cx('audio')}
              audioId={data.id}
              audioLink={audio}
              isEditable={isEditable}
              onAudioUpload={(newAudio) => handleAudioUpload(newAudio)}
              displayButtonText={false}
            />
          )}
          {isEnablePhoto && (
            <Fragment>
              {(isAddNew || isEdit) && (
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
                  className={cx('photo')}
                  photoId={data.id}
                  isEditable={isEditable}
                  imageUrl={data.photo.filePath}
                  altText={data.photo.filePath}
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
            textId={data.id}
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
              isComplete={false}
              quote={quote}
              quantityOfQuestions={39}
              quantityOfAnswersPerQuestion={4}
              onAddNew={handleBundleQuestionAddNew}
              onToggleComplete={(toggle) => setIsQuestionComplete(toggle)}
              onToggleAddNew={(toggle) => dispatch(toggleAddNew(toggle))}
              onToggleEdit={(toggle) => dispatch(toggleEdit(toggle))}
            />
          </AnswerChangeProvider>
        </QuestionsProvider>
      }
    />
  );
};

export default QuestionBundle;
