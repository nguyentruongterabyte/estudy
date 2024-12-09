import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import logFields from '~/redux/logFields';
import Question from '~/components/Question';
import styles from './Questions.module.scss';
import ErrorFieldsProvider from '~/context/ErrorFieldsProvider';
import Quote from '~/components/Quote';
import { useQuestions } from '~/context/QuestionsProvider';
import { getWithExpiry } from '~/utils/localStorageUtils';
import AddButton from '~/components/AddButton';
import CustomAccordion from '../CustomAccordion';
import QuestionHeader from './QuestionHeader';

const cx = classNames.bind(styles);

const fn = () => {};

const Questions = ({
  className,
  data = [],
  quantityOfAnswersPerQuestion = 4,
  quote,
  groupId,
  isAddNew,
  isEdit,
  isEnableAudio,
  isEnablePhoto,
  onAddNew = fn,
  onToggleComplete = fn,
}) => {
  const { t } = useTranslation();
  const { onAddQuestion } = useQuestions();
  const [errorFields, setErrorFields] = useState({});
  const { isEnableQuestionText } = useQuestions();
  const historyChanges = (getWithExpiry(`editHistory_${groupId}`) || [])
    .filter((history) => history.type === logFields.questionText) // get history changes of question text
    .map((history) => history.changes) // get fiels `changes` each history changes
    .flat(); // merged array

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

  return (
    <div className={cx('container', className)}>
      {!isAddNew && !isEdit && data.length === 0 && <Quote quote={quote} className={cx('quote')} />}
      <ErrorFieldsProvider errorFields={errorFields}>
        <CustomAccordion
          className={cx('accordion')}
          items={data.map((question, index) => ({
            header: <QuestionHeader question={question} isAddNew={isAddNew} index={index} />,
            body: (
              <Question
                data={question}
                isEditable={isAddNew || isEdit}
                isEnableAudio={isEnableAudio}
                isEnablePhoto={isEnablePhoto}
                historyChanges={historyChanges}
                quantityOfAnswersPerQuestion={quantityOfAnswersPerQuestion}
              />
            ),
          }))}
        />
      </ErrorFieldsProvider>
      {isAddNew && (
        <AddButton className={cx('add-button')} onClick={() => onAddQuestion()}>
          {t('addQuestion')}
        </AddButton>
      )}
    </div>
  );
};

export default Questions;
