import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import Question from '~/components/Compose/Question';
import QuestionProvider from '~/context/QuestionProvider';
import styles from './Questions.module.scss';
import ErrorFieldsProvider from '~/context/ErrorFieldsProvider';
import Button from '~/components/Button';
import CustomModal from '~/components/CustomModal';
import { logFields } from '~/redux/features/testSlice';
import Quote from '~/components/Quote';
import { useEnableMedia } from '~/context/EnableMediaProvider';
import { useQuestions } from '~/context/QuestionsProvider';
import { getWithExpiry } from '~/utils/localStorageUtils';

const cx = classNames.bind(styles);

const fn = () => {};

const Questions = ({
  className,
  data,
  quantityOfAnswersPerQuestion = 4,
  quote,
  groupId,
  eventLogs = [],
  isAddNew,
  isEdit,
  isComplete,
  isEnableAudio,
  isEnablePhoto,
  onAddNew = fn,
  onComplete = fn,
  onToggleComplete = fn,
  onToggleAddNew = fn,
  onToggleEdit = fn,
}) => {
  const { t } = useTranslation();
  // const questions = useSelector(questionList);
  const [errorFields, setErrorFields] = useState({});
  const [show, setShow] = useState(false);
  const { isEnableQuestionText } = useQuestions();
  const historyChanges = (getWithExpiry(`editHistory_${groupId}`) || [])
    .filter((history) => history.type === logFields.questionText) // get history changes of question text
    .map((history) => history.changes) // get fiels `changes` each history changes
    .flat(); // merged array

  useEffect(() => {
    if (isAddNew) {
      onAddNew();
    }
    // eslint-disable-next-line
  }, [isAddNew]);

  // validate questions when change
  useEffect(() => {
    if (Array.isArray(data)) validateQuestions();
    // eslint-disable-next-line
  }, [data]);

  // validate questions
  const validateQuestions = () => {
    let complete = true;
    const errors = {};

    data.forEach((question, index) => {
      question.answers?.forEach((answer, answerIndex) => {
        // Validate answers
        if (!answer.answer || answer.answer.trim() === '') {
          complete = false;
          errors[`answer_${index}_${answerIndex}`] = 'Empty answer';
        }
      });

      // validate question photo
      if (isEnablePhoto && !question.photo) {
        complete = false;
        errors[`image_${index}`] = 'No image selected';
      }

      // validate question audio
      if (isEnableAudio && !question.audio) {
        complete = false;
        errors[`audio_${index}`] = 'No audio selected';
      }

      // validate question text
      if (isEnableQuestionText && !question.question) {
        complete = false;
        errors[`question_${index}`] = 'Empty question text';
      }
    });

    onToggleComplete(complete);
    setErrorFields(errors);
  };

  // handle on complete button click
  const handleComplete = () => {
    if (isComplete && onComplete) {
      onComplete(data);
    }
  };

  const handleCancel = async () => {
    if (isAddNew) {
      onToggleAddNew(false);
    }

    if (isEdit) {
      onToggleEdit(false);
    }
    setShow(false);
  };

  return (
    <div className={cx('container', className)}>
      {!isAddNew && !isEdit && data.length === 0 && <Quote quote={quote} className={cx('quote')} />}
      <ErrorFieldsProvider errorFields={errorFields}>
        {Array.isArray(data) &&
          data.map((question, index) => (
            <QuestionProvider key={question.id} question={question}>
              <Question
                isEnableAudio={isEnableAudio}
                isEnablePhoto={isEnablePhoto}
                historyChanges={historyChanges.filter((history) => history.questionId === question.id)}
                data={question}
                index={index}
                isEditable={isAddNew || isEdit}
                quantityOfAnswersPerQuestion={quantityOfAnswersPerQuestion}
              />
            </QuestionProvider>
          ))}
        {(isAddNew || isEdit) && (
          <div className={cx('button-group')}>
            <Button
              onClick={() => {
                if (eventLogs.length === 0) handleCancel();
                else setShow(true);
              }}
              className={cx('cancel-button')}
              outline
            >
              {t('cancel')}
            </Button>
            <Button
              success={isComplete}
              onClick={handleComplete}
              disabled={!isComplete}
              className={cx('complete-button')}
            >
              {t('complete')}
            </Button>
          </div>
        )}
      </ErrorFieldsProvider>
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

export default Questions;
