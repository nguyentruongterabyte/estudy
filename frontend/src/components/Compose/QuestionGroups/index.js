import { toast } from 'react-toastify';
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { Button, Form, ListGroup } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './QuestionGroups.module.scss';
import QuestionGroup from '~/components/Compose/QuestionGroup';
import hooks from '~/hooks';
import {
  testGroupName,
  updateQuestionGroupName,
  isAddNew as adding,
  isEdit as editing,
  toggleAddNew,
  testGroupId,
  changeQuestions,
  updateQuestionGroupId,
  resetChangeLog,
} from '~/redux/features/testSlice';
import { isComplete as finished } from '~/redux/features/testSlice';
import { deleteQuestionGroup, questionGroupList } from '~/redux/features/questionGroupsSilce';
import CustomModal from '~/components/CustomModal';
import { useEnableMedia } from '~/context/EnableMediaProvider';

const cx = classNames.bind(styles);

const QuestionGroups = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isComplete = useSelector(finished);
  const isAddNew = useSelector(adding);
  const isEdit = useSelector(editing);
  const groupName = useSelector(testGroupName);
  const groupId = useSelector(testGroupId);
  const questionGroups = useSelector(questionGroupList);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { deleteTest } = hooks.useTestService();
  const { isEnablePhoto, isEnableAudio } = useEnableMedia();
  const { getQuestionsByGroupId } = hooks.useQuestionService();

  // fetch questions data
  const fetchQuestions = async (groupId) => {
    const questions = await getQuestionsByGroupId(groupId, isEnableAudio, isEnablePhoto);
    return questions;
  };

  const handleCancel = () => {
    dispatch(toggleAddNew({ toggle: false }));
    fetchQuestions(groupId).then((loadedQuestions) => {
      dispatch(changeQuestions({ questions: loadedQuestions }));
    });
    setShowEditModal(false);
  };

  const handleConfirmDeleteQuestionGroup = (groupId) => {
    setShowDeleteModal(true);
    dispatch(updateQuestionGroupId({ groupId }));
  };

  const handleDeleteQuestionGroup = async () => {
    // handle sync delete
    await toast
      .promise(deleteTest(groupId), {
        pending: t('deletingQuestionGroup'),
        success: t('deletedQuestionGroupSuccessfully'),
        error: t('failedToDeleteQuestionGroup'),
      })
      .then(() => {
        dispatch(deleteQuestionGroup({ groupId }));
        dispatch(changeQuestions({ questions: [] }));
      });

    setShowDeleteModal(false);
  };

  return (
    <div className={cx('container')}>
      <ListGroup as="ul">
        {questionGroups.map((questionGroup) => (
          // Question group item
          <QuestionGroup
            onDeleteQuestionGroup={(groupId) => handleConfirmDeleteQuestionGroup(groupId)}
            data={questionGroup}
            key={questionGroup.id}
          />
        ))}
      </ListGroup>
      {/* Add new question group */}
      {isAddNew ? (
        <div className={cx('input-wrapper')}>
          <Form.Control
            value={groupName}
            onChange={(e) => dispatch(updateQuestionGroupName({ name: e.target.value }))}
            className={cx('input-name')}
            size="lg"
            placeholder="Enter test group name"
          />
          <Tippy placement="bottom" content={t('cancel')}>
            <Button
              size="lg"
              onClick={() => setShowEditModal(true)}
              className={cx('cancel-button')}
              variant="outline-danger"
            >
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </Tippy>
          <Tippy placement="bottom" content={t('complete')}>
            <Button size="lg" disabled={!isComplete} variant="outline-success" className={cx('complete-button')}>
              <FontAwesomeIcon icon={faCheck} />
            </Button>
          </Tippy>
        </div>
      ) : !isEdit ? (
        <Button
          variant="outline-success"
          className={cx('btn-add')}
          onClick={() => {
            dispatch(toggleAddNew({ toggle: true }));
            dispatch(resetChangeLog());
          }}
        >
          {t('createNewTest')}
        </Button>
      ) : (
        <Fragment />
      )}
      {/* Modal ask cancel edit */}
      <CustomModal
        title={t('cancelEdit')}
        body={t('confirmCancelEdit')}
        show={showEditModal}
        setShow={setShowEditModal}
        handleAgreeButtonClick={handleCancel}
      />

      {/* Modal ask delete */}
      <CustomModal
        title={t('deleteQuestionGroup')}
        body={t('confirmDeleteQuestionGroup')}
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        handleAgreeButtonClick={handleDeleteQuestionGroup}
      />
    </div>
  );
};

export default QuestionGroups;
