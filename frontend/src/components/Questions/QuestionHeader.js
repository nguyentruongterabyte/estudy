import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';

import { useQuestions } from '~/context/QuestionsProvider';
import styles from './QuestionHeader.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

const QuestionHeader = ({ question, isAddNew, index }) => {
  const { t } = useTranslation();
  const { onDeleteQuestion } = useQuestions();

  const handleDeleteQuestion = (e, questionId) => {
    e.stopPropagation();
    onDeleteQuestion(questionId);
  };
  return (
    <div className={cx('container')}>
      <span className={cx('order')}>{`${t('question')} #${question.order ? question.order : index + 1}`}</span>
      {isAddNew && (
        <div className={cx('button-group')}>
          <Button
            onClick={(e) => {
              handleDeleteQuestion(e, question.id);
            }}
            className={cx('delete-button')}
            size="lg"
            variant="danger"
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuestionHeader;
