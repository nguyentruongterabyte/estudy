import { Button, Form, ListGroup } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './QuestionGroups.module.scss';
import QuestionGroup from './QuestionGroup';
import { useQuestionGroups } from '~/context/QuestionGroupsProvider';
import { Fragment, useEffect, useState } from 'react';
import hooks from '~/hooks';

const cx = classNames.bind(styles);

const QuestionGroups = () => {
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
    if (questionGroups.length > 0) setGroupId(questionGroups[0].id);
  }, [questionGroups]);

  return (
    <Fragment>
      <ListGroup as="ul" className={cx('container')}>
        {questionGroups.map((questionGroup) => (
          // Question group item
          <QuestionGroup data={questionGroup} key={questionGroup.id} />
        ))}
      </ListGroup>
      {/* Add new question group */}
      {isAddNew ? (
        <Form.Control
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className={cx('input-name')}
          size="lg"
          placeholder="Enter test group name"
        />
      ) : (
        <Button variant="outline-success" className={cx('btn-add')} onClick={() => setIsAddNew(true)}>
          Create new test
        </Button>
      )}
    </Fragment>
  );
};

export default QuestionGroups;
