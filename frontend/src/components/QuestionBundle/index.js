import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';

import ResizeablePanels from '~/components/ResizeablePanels';
import AudioPlayer from '../AudioPlayer';
import DisplayImage from '../DisplayImage';
import Questions from '../Questions';
import AnswerChangeProvider from '~/context/AnswerChangeProvider';
import QuestionsProvider from '~/context/QuestionsProvider';
import hooks from '~/hooks';
import {
  updateText,
  updateQuestionText,
  updateAnswer,
  changeCorrectAnswerIndex,
  toggleEnablePhoto,
  updateAudio,
  updatePhoto,
  finished,
  deleteQuestion,
  addQuestion,
  updateExplainText,
} from '~/redux/features/questionBundlesSlice';
import CustomTextArea from '~/components/CustomTextArea';
import styles from './QuestionBundle.module.scss';
import { Form } from 'react-bootstrap';
import { deleteQuestionGroup, toggleAddNew, toggleEdit } from '~/redux/features/questionGroupsSilce';
import Quote from '~/components/Quote';
import CustomModal from '~/components/CustomModal';
import { useUserMode } from '~/context/UserModeProvider';
import { groups, updateUserAnswer } from '~/redux/features/userAnswersSlice';

const cx = classNames.bind(styles);

const fn = () => {};

const QuestionBundle = ({
  isAddNew,
  isEdit,
  groupId,
  className,
  data,
  quote,
  isEnableChooseNumberOfQuestion,
  isEnablePhoto,
  isEnableAudio,
  isEnableExplainText,
  isTextHiddenDuringPractice,
  quantityOfAnswersPerQuestion,
  alwaysOpen,
  onComplete = fn,
}) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const isComplete = useSelector(finished);
  const newQuestionGroup = hooks.useNewQuestionGroup();
  const isEditable = isAddNew || isEdit;

  const [inputValue, setInputValue] = useState(data.text);
  const [photoChecked, setPhotoChecked] = useState(data.isEnablePhoto);
  const debouncedValue = hooks.useDebounce(inputValue, 300);
  const debouncedPhotoChecked = hooks.useDebounce(photoChecked, 150);

  const [selectedAudio, setSelectedAudio] = useState(
    data.audio instanceof File ? URL.createObjectURL(data.audio) : data.audio,
  );
  const [isEmptyAudio, setIsEmptyAudio] = useState(false);
  const [questionId, setQuestionId] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(
    data.photo instanceof File ? URL.createObjectURL(data.photo) : data.photo,
  );
  const [isEmptyPhoto, setIsEmptyPhoto] = useState(false);

  const { isUserMode } = useUserMode();
  const { createUserAnswer } = hooks.useUserAnswerService();
  const userAnswers = useSelector(groups);

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
    dispatch(updateAudio({ id: data.id, audio: newAudio, audioId: data.audioId }));
    setIsEmptyAudio(false);
    setSelectedAudio(newAudio instanceof File ? URL.createObjectURL(newAudio) : newAudio);
  };

  // handle photo upload
  const handlePhotoUpload = (newPhoto) => {
    dispatch(updatePhoto({ id: data.id, photo: newPhoto, photoId: data.photoId }));
    setIsEmptyPhoto(false);
    setSelectedPhoto(newPhoto instanceof File ? URL.createObjectURL(newPhoto) : newPhoto);
  };

  // handle question text change
  const handleQuestionTextChange = (question) => {
    dispatch(updateQuestionText({ id: data.id, ...question }));
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

  // delete question
  const handleDeleteQuestion = () => {
    dispatch(deleteQuestion({ id: data.id, questionId }));
    setShowDeleteModal(false);
  };

  // add question
  const handleAddQuestion = () => {
    dispatch(addQuestion({ id: data.id, quantityOfAnswersPerQuestion }));
  };

  const handleUserSelectAnswer = async (questionId, answerId) => {
    await createUserAnswer(questionId, answerId);
    dispatch(updateUserAnswer({ groupId, questionId, answerId }));
    console.log(groupId, questionId, answerId);
  };

  // handle explain text change: `questionId` and `explain`
  const handleExplainTextChange = (explainData) => {
    dispatch(updateExplainText({ id: data.id, ...explainData }));
  };

  // check if all of questions user answered
  const isUserAnsweredAll = (questions) => {
    if (!Array.isArray(questions) || !questions.length) return false; // No questions => false
    if (!Array.isArray(userAnswers) || !userAnswers.length) return false; // No user answer => false

    const userAnswerQuestionIds = new Set(
      userAnswers
        .flatMap((user) => user.userAnswers) // merge `userAnswers`
        .filter((answer) => answer.userAnswerId)
        .map((answer) => answer.questionId), // Get list of `questionId`
    );

    return questions.every((question) => userAnswerQuestionIds.has(question.id));
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

    // eslint-disable-next-line
  }, [debouncedPhotoChecked]);

  useEffect(() => {
    if (!data.audio) setIsEmptyAudio(true);
  }, [data.audio]);

  useEffect(() => {
    if (!data.photo) setIsEmptyPhoto(true);
  }, [data.photo]);

  useEffect(() => {
    if (data.text !== inputValue) setInputValue(data.text);
    // eslint-disable-next-line
  }, [data.text]);

  return (
    <div className={cx('container')}>
      {data ? (
        <ResizeablePanels
          className={cx('resizeable-panels', className)}
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
              {isUserMode ? (
                !isTextHiddenDuringPractice || isUserAnsweredAll(data.questions) ? (
                  <CustomTextArea
                    isEnableRaw={true}
                    displayButtonText={true}
                    className={cx('text')}
                    title="paragraph"
                    isEditable={false}
                    historyChanges={[]}
                    rows={10}
                    onChange={(content) => setInputValue(content)}
                    value={inputValue}
                    isError={false}
                    onHistoryItemClick={handleHistoryItemClick}
                    textId={`bundle_text_${data.id}`}
                  />
                ) : (
                  <Fragment />
                )
              ) : (
                <CustomTextArea
                  isEnableRaw={true}
                  displayButtonText={true}
                  className={cx('text')}
                  title="paragraph"
                  isEditable={isEditable}
                  historyChanges={[]}
                  rows={10}
                  onChange={(content) => setInputValue(content)}
                  value={inputValue}
                  isError={false}
                  onHistoryItemClick={handleHistoryItemClick}
                  textId={`bundle_text_${data.id}`}
                />
              )}
            </div>
          }
          rightChildren={
            <QuestionsProvider
              isEnableExplainText={isEnableExplainText}
              questionTextRow={4}
              onQuestionTextChange={handleQuestionTextChange}
              onDeleteQuestion={(id) => {
                setQuestionId(id);
                setShowDeleteModal(true);
              }}
              onExplainTextChange={handleExplainTextChange}
              onAddQuestion={handleAddQuestion}
              isEnableQuestionText={true}
              isEnableChooseNumberOfQuestion={isEnableChooseNumberOfQuestion}
              questions={data.questions}
              displayButtonText={false}
              onUserSelectAnswer={handleUserSelectAnswer}
            >
              <AnswerChangeProvider
                onAnswerChange={handleAnswerChange}
                onCorrectAnswerChange={handleCorrectAnswerChange}
              >
                <Questions
                  alwaysOpen={alwaysOpen}
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
      ) : (
        <Quote quote={quote} />
      )}
      {/* Modal ask delete */}
      <CustomModal
        title={t('deleteQuestion')}
        body={t('confirmDeleteQuestion')}
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        handleAgreeButtonClick={handleDeleteQuestion}
      />
    </div>
  );
};

export default QuestionBundle;
