import { Badge, Button, Form, ListGroup } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './QuestionGroups.module.scss';
import QuestionGroup from './QuestionGroup';
import { useQuestionGroups } from '~/context/QuestionGroupsProvider';
import { Fragment, useEffect, useState } from 'react';
import hooks from '~/hooks';

const cx = classNames.bind(styles);

const QuestionGroups = ({ onGroupNameChange }) => {
  const { getQuestionGroups } = hooks.useQuestionService();
  const [questionGroups, setQuestionGroups] = useState([]);
  const [groupName, setGroupName] = useState('');

  const { setGroupId, isAddNew, setIsAddNew } = useQuestionGroups();

  // fetch question groups data
  const fetchQuestionGroups = async (partId) => {
    const groups = await getQuestionGroups(partId);
    setQuestionGroups(groups);
  };

  // handle on group questions on first time
  useEffect(() => {
    fetchQuestionGroups(1);
  }, []);

  useEffect(() => {
    if (questionGroups.length > 0) {
      setGroupId(questionGroups[0].id);
      setGroupName(`Test ${questionGroups.length + 1}`);
    }
  }, [questionGroups]);

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
            onChange={(e) => {
              setGroupName(e.target.value);
              onGroupNameChange(e.target.value);
            }}
            className={cx('input-name')}
            size="lg"
            placeholder="Enter test group name"
          />
          <h2 className={cx('badge')}>
            <Badge bg="secondary">New</Badge>
          </h2>
        </div>
      ) : (
        <Button variant="outline-success" className={cx('btn-add')} onClick={() => setIsAddNew(true)}>
          Create new test
        </Button>
      )}
    </div>
  );
};

export default QuestionGroups;
