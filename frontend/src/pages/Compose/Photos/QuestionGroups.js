import { Button, Form, ListGroup } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './QuestionGroups.module.scss';
import QuestionGroup from './QuestionGroup';
import hooks from '~/hooks';
import {
  testGroupName,
  updateQuestionGroupName,
  isAddNew as adding,
  isEdit as editing,
  toggleAddNew,
  updateQuestionGroupId,
  testGroupId,
  changeQuestions,
} from '~/redux/features/testSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { isComplete as finished } from '~/redux/features/testSlice';
import { changeQuestionGroups, questionGroupList } from '~/redux/features/questionGroupsSilce';
import CustomModal from '~/components/CustomModal';

const cx = classNames.bind(styles);

const QuestionGroups = () => {
  const dispatch = useDispatch();
  const isComplete = useSelector(finished);
  const isAddNew = useSelector(adding);
  const isEdit = useSelector(editing);
  const groupName = useSelector(testGroupName);
  const groupId = useSelector(testGroupId);
  const questionGroups = useSelector(questionGroupList);
  const [show, setShow] = useState(false);
  const { getQuestionsByGroupId } = hooks.useQuestionService();

  
  // fetch questions data
  const fetchQuestions = async (groupId) => {
    const audio = true;
    const photo = true;
    const questions = await getQuestionsByGroupId(groupId, audio, photo);
    return questions;
  };
  
  const handleCancel = () => {
    dispatch(toggleAddNew({ toggle: false }));
    fetchQuestions(groupId).then((loadedQuestions) => {
      dispatch(changeQuestions({ questions: loadedQuestions }));
    });
    setShow(false);
  };

 

  return (
    <div className={cx('container')}>
      <ListGroup as="ul">
        {questionGroups.map((questionGroup) => (
          // Question group item
          <QuestionGroup data={questionGroup} key={questionGroup.id} />
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
          <Button size="lg" onClick={() => setShow(true)} className={cx('cancel-button')} variant="outline-danger">
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <Button size="lg" disabled={!isComplete} variant="outline-success" className={cx('complete-button')}>
            <FontAwesomeIcon icon={faCheck} />
          </Button>
        </div>
      ) : !isEdit ? (
        <Button
          variant="outline-success"
          className={cx('btn-add')}
          onClick={() => dispatch(toggleAddNew({ toggle: true }))}
        >
          Create new test
        </Button>
      ) : (
        <Fragment />
      )}
      {/* Modal ask cancel edit */}
      <CustomModal
        title="Cancel Edit"
        body="Are you sure cancel edit"
        show={show}
        setShow={setShow}
        handleAgreeButtonClick={handleCancel}
      />
    </div>
  );
};

export default QuestionGroups;
