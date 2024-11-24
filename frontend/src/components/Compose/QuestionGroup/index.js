import { Button, FormControl, ListGroup } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import styles from './QuestionGroup.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { activeGroup, adding, editing, setActive, toggleEdit, updateName } from '~/redux/features/questionGroupsSilce';
import { useEffect, useState } from 'react';
import hooks from '~/hooks';

const cx = classNames.bind(styles);

const QuestionGroup = ({ onDeleteQuestionGroup, data }) => {
  const active = useSelector(activeGroup);
  const isAddNew = useSelector(adding);
  const isEdit = useSelector(editing);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(data.name);
  const debouncedValue = hooks.useDebounce(inputValue, 300);

  const handleEdit = (event, groupId) => {
    event.stopPropagation();
    dispatch(toggleEdit({ toggle: true }));
    dispatch(setActive({ id: groupId, name: data.name }));
  };

  const handleDeleteQuestionGroup = (event, groupId) => {
    event.stopPropagation();
    onDeleteQuestionGroup(groupId);
  };

  useEffect(() => {
    if ( debouncedValue !== data.name ) {
      dispatch( updateName( { id: data.id, name: debouncedValue } ) );
    }
  }, [debouncedValue]);

  return (
    // Question group item
    <ListGroup.Item
      onClick={() => dispatch(setActive({ id: data.id, name: data.name }))}
      as="li"
      active={!isAddNew && !isEdit && data.id === active.id}
      disabled={isEdit && data.id !== active.id}
      className={cx('container')}
    >
      {isEdit && active.id === data.id ? (
        <FormControl className={cx('input')} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      ) : (
        <span className={cx('name')}>{data.name}</span>
      )}
      {!isEdit && !isAddNew && (
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
