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
} from '~/redux/features/testSlice';
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
import { useState } from 'react';

const cx = classNames.bind(styles);

const QuestionSingle = ({
  isEnableQuestionText,
  isQuestionsLoading,
  quote,
  quantityOfQuestions,
  quantityOfAnswersPerQuestion,
  isEnableAudio,
  isEnablePhoto,
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

  const questions = useSelector(questionList);

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
    correctAnswer: { answerId: 0 },
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
  
  const handleQuestionsAddNew = () => {
    dispatch(
      changeQuestions({
        questions: newQuestions,
      }),
    );
  };

  // cancel add new
  const handleToggleAddNew = (toggle) => {
    dispatch(toggleAddNew({ toggle }));
    dispatch(deleteQuestionGroup({ groupId: newQuestionGroup.id }));
  };

  return (
    <div className={cx('container')}>
      <QuestionsProvider
        isEnableQuestionText={isEnableQuestionText}
        questions={questions}
        onQuestionTextChange={(question) => dispatch(updateQuestionText(question))}
        onImageUpload={(image) => dispatch(updateQuestionPhoto(image))}
        onAudioUpload={(audio) => dispatch(updateQuestionAudio(audio))}
      >
        <AnswerChangeProvider
          onAnswerChange={(answer) => dispatch(updateAnswer(answer))}
          onCorrectAnswerChange={(correctAnswer) => dispatch(changeCorrectAnswerIndex(correctAnswer))}
        >
          {isQuestionsLoading ? (
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
              onAddNew={handleQuestionsAddNew}
              onToggleComplete={(toggle) => dispatch(toggleComplete({ toggle }))}
              onToggleAddNew={handleToggleAddNew}
              onToggleEdit={(toggle) => dispatch(toggleEdit({ toggle }))}
            />
          )}
        </AnswerChangeProvider>
      </QuestionsProvider>

      {/* Modal ask cancel edit */}
      <CustomModal
        title={t('cancelEdit')}
        body={t('confirmCancelEdit')}
        show={show}
        setShow={setShow}
        handleAgreeButtonClick={handleCancel}
      />
    </div>
  );
};

export default QuestionSingle;
