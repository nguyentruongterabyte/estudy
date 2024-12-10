import { Button, FormControl, ListGroup } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import styles from './QuestionGroup.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { activeGroup, adding, editing, setActive, toggleEdit, updateName } from '~/redux/features/questionGroupsSilce';
import { useEffect, useState } from 'react';
import hooks from '~/hooks';
import { useQuestionGroup } from '~/context/QuestionGroupProvider';
import { useUserMode } from '~/context/UserModeProvider';
import CircularProgress from '../CircularProgress';
import { addUserAnswers, groups } from '~/redux/features/userAnswersSlice';
import { adding as grammarAdding, editing as grammarEditing } from '~/redux/features/grammarsSlice';

const cx = classNames.bind(styles);

const QuestionGroup = ({ data }) => {
  const active = useSelector(activeGroup);
  const userAnswerGroups = useSelector(groups);
  const isAddNew = useSelector(adding);
  const isEdit = useSelector(editing);
  const isGrammarAddNew = useSelector(grammarAdding);
  const isGrammarEdit = useSelector(grammarEditing);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(data.name);
  const debouncedValue = hooks.useDebounce(inputValue, 300);
  const { getUserAnswers } = hooks.useTestService();
  const { onDelete, isEnableClick } = useQuestionGroup();
  const { isUserMode, userId } = useUserMode();
  const [percentage, setPercentage] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleEdit = (event, groupId) => {
    event.stopPropagation();
    dispatch(toggleEdit({ toggle: true }));
    dispatch(setActive({ id: groupId, name: data.name }));
  };

  const handleDeleteQuestionGroup = (event, groupId) => {
    event.stopPropagation();
    onDelete(groupId);
  };

  useEffect(() => {
    // handle get answer user
    const fetchUserAnswers = async (groupId) => {
      const userAnswers = await getUserAnswers(userId, groupId);
      return userAnswers;
    };

    if (isUserMode) {
      fetchUserAnswers(data.id)
        .then((userAnswers) => {
          setUserAnswers(userAnswers);
          dispatch(addUserAnswers({ id: data.id, userAnswers }));
          // console.log(userAnswers);
        })
        .catch((error) => console.error(error));
    }
    // eslint-disable-next-line
  }, [isUserMode, data.id, userId]);

  useEffect(() => {
    if (userAnswers.length > 0) {
      let percentage = 0;
      const lengthOfQuestions = userAnswers.length;
      userAnswers.forEach((userAnswer) => {
        if (userAnswer.userAnswerId === userAnswer.correctAnswerId) percentage += (1 / lengthOfQuestions) * 100;
      });

      setPercentage(Math.round(percentage));
    }
  }, [userAnswers]);

  useEffect(() => {
    if (debouncedValue !== data.name) {
      dispatch(updateName({ id: data.id, name: debouncedValue }));
    }
    // eslint-disable-next-line
  }, [debouncedValue]);

  useEffect(() => {
    if (isUserMode) {
      const userAnswerGroup = userAnswerGroups.find((uag) => uag.id === data.id);
      if (userAnswerGroup) setUserAnswers(userAnswerGroup.userAnswers);
    }
  }, [userAnswerGroups, data.id, isUserMode]);

  return (
    // Question group item
    <ListGroup.Item
      onClick={() => dispatch(setActive({ id: data.id, name: data.name }))}
      as="li"
      active={!isAddNew && !isEdit && data.id === active.id}
      disabled={(isEdit && data.id !== active.id) || !isEnableClick}
      className={cx('container')}
    >
      {isEdit && active.id === data.id ? (
        <FormControl className={cx('input')} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      ) : (
        <span className={cx('name')}>{data.name}</span>
      )}
      {!(isUserMode || isEdit || isAddNew || isGrammarAddNew || isGrammarEdit) && (
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
      {isUserMode && (
        <CircularProgress
          progressBarStyles={{
            textSize: '2.8rem',
            textColor: data.id === active.id ? 'yellow' : 'blue',
            pathColor: data.id === active.id ? 'yellow' : 'blue',
          }}
          percentage={percentage}
          className={cx('progress')}
        />
      )}
    </ListGroup.Item>
  );
};

export default QuestionGroup;
