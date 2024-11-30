import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import logFields from '~/redux/logFields';
import Question from '~/components/Question';
import QuestionProvider from '~/context/QuestionProvider';
import styles from './Questions.module.scss';
import ErrorFieldsProvider from '~/context/ErrorFieldsProvider';
import CustomModal from '~/components/CustomModal';
import Quote from '~/components/Quote';
import { useQuestions } from '~/context/QuestionsProvider';
import { getWithExpiry } from '~/utils/localStorageUtils';
import AddButton from '~/components/AddButton';

const cx = classNames.bind(styles);

const fn = () => {};

const Questions = ({
  className,
  data,
  quantityOfAnswersPerQuestion = 4,
  quote,
  groupId,
  isAddNew,
  isEdit,
  isEnableAudio,
  isEnablePhoto,
  onAddNew = fn,
  onToggleComplete = fn,
  onToggleAddNew = fn,
  onToggleEdit = fn,
}) => {
  const { t } = useTranslation();
  const { onAddQuestion } = useQuestions();
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

      question.answers?.forEach((answer, answerIndex) => {
        // Validate answers
        if (!answer.answer || answer.answer.trim() === '') {
          complete = false;
          errors[`answer_${index}_${answerIndex}`] = 'Empty answer';
        }
      });

      // validate question text
      if (isEnableQuestionText && !question.question) {
        complete = false;
        errors[`question_${index}`] = 'Empty question text';
      }
    });

    onToggleComplete(complete);
    setErrorFields(errors);
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
                isAddNew={isAddNew}
                isEditable={isAddNew || isEdit}
                quantityOfAnswersPerQuestion={quantityOfAnswersPerQuestion}
              />
            </QuestionProvider>
          ))}
      </ErrorFieldsProvider>
      {isAddNew && (
        <AddButton className={cx('add-button')} onClick={() => onAddQuestion()}>
          {t('addQuestion')}
        </AddButton>
      )}
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
