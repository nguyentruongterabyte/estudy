import { Button, FormControl, ListGroup } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import styles from './QuestionGroup.module.scss';
import {
  updateQuestionGroupId,
  testGroupId,
  toggleEdit,
  isAddNew as adding,
  isEdit as editing,
  testGroupName,
  updateQuestionGroupName,
  updateQuestionGroupNameWithoutLog,
  resetChangeLog,
} from '~/redux/features/testSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const QuestionGroup = ({ onDeleteQuestionGroup, data }) => {
  const groupName = useSelector(testGroupName);
  const groupId = useSelector(testGroupId);
  const isAddNew = useSelector(adding);
  const isEdit = useSelector(editing);
  const dispatch = useDispatch();

  const handleEdit = (event, groupId) => {
    event.stopPropagation();
    dispatch(toggleEdit({ toggle: true }));
    dispatch(updateQuestionGroupId({ groupId }));
    dispatch(updateQuestionGroupNameWithoutLog({ name: data.name }));
  };

  const handleDeleteQuestionGroup = (event, groupId) => {
    event.stopPropagation();
    onDeleteQuestionGroup(groupId);
  };
  return (
    // Question group item
    <ListGroup.Item
      onClick={() => dispatch(updateQuestionGroupId({ groupId: data.id }))}
      as="li"
      active={!isAddNew && !isEdit && data.id === groupId}
      disabled={isEdit && data.id !== groupId}
      className={cx('container')}
    >
      {isEdit && groupId === data.id ? (
        <FormControl
          className={cx('input')}
          value={groupName}
          onChange={(e) => dispatch(updateQuestionGroupName({ name: e.target.value }))}
        />
      ) : (
        <span className={cx('name')}>{data.name}</span>
      )}
      {!isEdit && (
        <div className={cx('button-group')}>
          <Button onClick={(e) => handleEdit(e, data.id)} className={cx('edit-button')} size="lg" variant="success">
            <FontAwesomeIcon icon={faPencil} />
          </Button>
          <Button
            onClick={(e) => handleDeleteQuestionGroup(e, data.id)}
            className={cx('delete-button')}
            size="lg"
            variant="danger"
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
      )}
    </ListGroup.Item>
  );
};

export default QuestionGroup;
