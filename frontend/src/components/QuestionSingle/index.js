import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import styles from './QuestionSingle.module.scss';
import QuestionsProvider from '~/context/QuestionsProvider';
import {
  isComplete as finished,
  changeCorrectAnswerIndex,
  changeLog,
  updateAnswer,
  updateQuestionAudio,
  updateQuestionPhoto,
  updateQuestionText,
  changeQuestions,
  toggleComplete,
  questionList,
  deleteQuestion,
  addQuestion,
  updateExplainText,
} from '~/redux/features/questionsSingleSlice';
import AnswerChangeProvider from '~/context/AnswerChangeProvider';
import Loading from '~/components/Loading';
import Questions from '../Questions';
import hooks from '~/hooks';
import { useTranslation } from 'react-i18next';
import {
  activeGroup,
  adding,
  deleteQuestionGroup,
  editing,
  toggleAddNew,
  toggleEdit,
} from '~/redux/features/questionGroupsSilce';

import CustomModal from '~/components/CustomModal';
import { Fragment, useEffect, useState } from 'react';
import { useUserMode } from '~/context/UserModeProvider';
import { updateUserAnswer } from '~/redux/features/userAnswersSlice';
import base64 from '~/utils/base64';
import ScoredBoard from '../ScoredBoard';
import Quote from '../Quote';

const cx = classNames.bind(styles);

const fn = () => {};

const QuestionSingle = ({
  isEnableQuestionText,
  isQuestionsLoading,
  quote,
  quantityOfQuestions,
  quantityOfAnswersPerQuestion,
  isEnableAudio,
  isEnablePhoto,
  isEnableExplainText,
  partId,
  isGrammar = false,
  grammarId,
  isPractice = false,
  alwaysOpen,
  activeQuestionIndex,
  setIsPractice = fn,
  onStartPractice = fn,
  onReviewTest = fn,
  onContinueTest = fn,
}) => {
  const { t } = useTranslation();

  const newQuestionGroup = hooks.useNewQuestionGroup();

  const dispatch = useDispatch();
  const eventLogs = useSelector(changeLog);
  const isAddNew = useSelector(adding);
  const isEdit = useSelector(editing);
  const active = useSelector(activeGroup);
  const groupId = active.id;
  const isComplete = useSelector(finished);
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [questionId, setQuestionId] = useState(null);

  const { isUserMode } = useUserMode();
  const { createUserAnswer } = hooks.useUserAnswerService();

  const questions = useSelector(questionList);
  const { getItem: getNewSavedItem } = hooks.useSaveData(isGrammar ? 'new_grammar' : 'new_test');

  const newQuestions = Array.from({ length: quantityOfQuestions }).map((_, index) => ({
    id: index,
    photoId: index,
    audioId: index,
    photo: '',
    audio: '',
    question: '',

    answers: Array.from({ length: quantityOfAnswersPerQuestion }).map((_, answerIndex) => ({
      id: answerIndex,
      index: answerIndex,
      answer: '',
    })),
    correctAnswerIndex: 0,
    correctAnswer: { answerId: 0, explain: '' },
  }));

  const handleCancel = async () => {
    if (isAddNew) {
      dispatch(toggleAddNew({ toggle: false }));
    }

    if (isEdit) {
      dispatch(toggleEdit({ toggle: false }));
    }
    setShow(false);
  };

  // cancel add new
  const handleToggleAddNew = (toggle) => {
    dispatch(toggleAddNew({ toggle }));
    dispatch(deleteQuestionGroup({ groupId: newQuestionGroup.id }));
  };

  // delete question
  const handleDeleteQuestion = () => {
    dispatch(deleteQuestion({ id: questionId }));
    setShowDeleteModal(false);
  };

  // handle explain text change: `questionId` and `explain`
  const handleExplainTextChange = (explainData) => {
    dispatch(updateExplainText(explainData));
  };

  // add question
  const handleAddQuestion = () => {
    dispatch(addQuestion({ quantityOfAnswersPerQuestion }));
  };

  const handleUserSelectAnswer = async (questionId, answerId) => {
    await createUserAnswer(questionId, answerId);
    dispatch(updateUserAnswer({ groupId, questionId, answerId }));
  };

  useEffect(() => {
    if (isAddNew) {
      const saveData = getNewSavedItem(isGrammar ? grammarId : partId);

      if (saveData) {
        const questionsWithFiles = saveData.questions.map((question) => {
          const questionWithFiles = { ...question };

          if (question.photo) {
            questionWithFiles.photo = base64.base64ToFile(question.photo, `question_photo_${question.id}.jpg`);
          }

          if (question.audio) {
            questionWithFiles.audio = base64.base64ToFile(question.audio, `question_audio_${question.id}.mp3`);
          }

          return questionWithFiles;
        });
        dispatch(changeQuestions({ questions: questionsWithFiles }));
      } else {
        dispatch(changeQuestions({ questions: newQuestions }));
      }
    }
    // eslint-disable-next-line
  }, [isAddNew, grammarId, isGrammar]);

  return (
    <Fragment>
      {questions.length > 0 ? (
        <div className={cx('container')}>
          <QuestionsProvider
            isEnableExplainText={isEnableExplainText}
            isEnableQuestionText={isEnableQuestionText}
            questions={questions}
            questionTextRow={2}
            onExplainTextChange={handleExplainTextChange}
            onDeleteQuestion={(id) => {
              setQuestionId(id);
              setShowDeleteModal(true);
            }}
            onAddQuestion={handleAddQuestion}
            onQuestionTextChange={(question) => dispatch(updateQuestionText(question))}
            onImageUpload={(image) => dispatch(updateQuestionPhoto(image))}
            onAudioUpload={(audio) => dispatch(updateQuestionAudio(audio))}
            onUserSelectAnswer={handleUserSelectAnswer}
          >
            <AnswerChangeProvider
              onAnswerChange={(answer) => dispatch(updateAnswer(answer))}
              onCorrectAnswerChange={(correctAnswer) => dispatch(changeCorrectAnswerIndex(correctAnswer))}
            >
              {isUserMode ? (
                !isPractice ? (
                  <ScoredBoard
                    onContinueTest={onContinueTest}
                    onReviewTest={onReviewTest}
                    onStartPractice={onStartPractice}
                    setIsPractice={setIsPractice}
                  />
                ) : (
                  <Questions
                    activeQuestionIndex={activeQuestionIndex}
                    alwaysOpen={alwaysOpen}
                    isEnableAudio={isEnableAudio}
                    isEnablePhoto={isEnablePhoto}
                    className={cx('questions')}
                    eventLogs={eventLogs}
                    data={questions}
                    isAddNew={false}
                    isEdit={false}
                    groupId={groupId}
                    isComplete={isComplete}
                    quantityOfQuestions={quantityOfQuestions}
                    quantityOfAnswersPerQuestion={quantityOfAnswersPerQuestion}
                    onToggleComplete={(toggle) => dispatch(toggleComplete({ toggle }))}
                    onToggleAddNew={handleToggleAddNew}
                    onToggleEdit={(toggle) => dispatch(toggleEdit({ toggle }))}
                  />
                )
              ) : isQuestionsLoading ? (
                <Loading />
              ) : (
                <Questions
                  isEnableAudio={isEnableAudio}
                  isEnablePhoto={isEnablePhoto}
                  className={cx('questions')}
                  eventLogs={eventLogs}
                  data={questions}
                  isAddNew={isAddNew}
                  isEdit={isEdit}
                  groupId={groupId}
                  isComplete={isComplete}
                  quote={quote}
                  quantityOfQuestions={quantityOfQuestions}
                  quantityOfAnswersPerQuestion={quantityOfAnswersPerQuestion}
                  onToggleComplete={(toggle) => dispatch(toggleComplete({ toggle }))}
                  onToggleAddNew={handleToggleAddNew}
                  onToggleEdit={(toggle) => dispatch(toggleEdit({ toggle }))}
                />
              )}
            </AnswerChangeProvider>
          </QuestionsProvider>

          {/* Modal ask delete */}
          <CustomModal
            title={t('deleteQuestion')}
            body={t('confirmDeleteQuestion')}
            show={showDeleteModal}
            setShow={setShowDeleteModal}
            handleAgreeButtonClick={handleDeleteQuestion}
          />

          {/* Modal ask cancel edit */}
          <CustomModal
            title={t('cancelEdit')}
            body={t('confirmCancelEdit')}
            show={show}
            setShow={setShow}
            handleAgreeButtonClick={handleCancel}
          />
        </div>
      ) : (
        <Quote quote={quote} />
      )}
    </Fragment>
  );
};

export default QuestionSingle;
