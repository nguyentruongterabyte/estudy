import { toast } from 'react-toastify';
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { Button, Form, ListGroup } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './QuestionGroups.module.scss';
import QuestionGroup from '~/components/Compose/QuestionGroup';
import hooks from '~/hooks';
import { resetChangeLog } from '~/redux/features/testSlice';

import { resetChangeLog as resetBundleChangeLog } from '~/redux/features/questionBundlesSlice';

import {
  activeGroup,
  adding,
  deleteQuestionGroup,
  editing,
  questionGroupList,
  toggleAddNew,
  updateName,
} from '~/redux/features/questionGroupsSilce';
import CustomModal from '~/components/CustomModal';

const cx = classNames.bind(styles);

const fn = () => {};

const QuestionGroups = ({ isComplete, onCancel = fn, onDelete = fn }) => {
  const data = useSelector(questionGroupList);
  const active = useSelector(activeGroup);
  const isAddNew = useSelector(adding);
  const isEdit = useSelector(editing);
  const groupId = active.id;
  const groupName = active.name;
  const [inputValue, setInputValue] = useState(groupName);
  const debouncedValue = hooks.useDebounce(inputValue, 10);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { deleteTest } = hooks.useTestService();

  // handle cancel
  const handleCancel = () => {
    onCancel();
    setShowEditModal(false);
  };

  const handleConfirmDeleteQuestionGroup = () => {
    setShowDeleteModal(true);
    // dispatch(updateQuestionGroupId({ groupId }));
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
        onDelete();
      });

    setShowDeleteModal(false);
  };

  const handleAddNew = () => {
    dispatch(toggleAddNew({ toggle: true }));
    dispatch(resetChangeLog());
    dispatch(resetBundleChangeLog());
  };

  useEffect(() => {
    if (debouncedValue !== groupName) {
      dispatch(updateName({ id: groupId, name: debouncedValue }));
    }
  }, [debouncedValue]);

  useEffect(() => {
    setInputValue(groupName);
  }, [groupName]);

  return (
    <div className={cx('container')}>
      <ListGroup as="ul">
        {data.map((questionGroup) => (
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
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
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
        <Button variant="outline-success" className={cx('btn-add')} onClick={handleAddNew}>
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
