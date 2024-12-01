import { Button, FormControl, ListGroup } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import styles from './VocabularyTopic.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import {
  activeTopic,
  adding,
  editing,
  setActive,
  toggleEdit,
  updateName,
} from '~/redux/features/vocabularyTopicsSlice';
import { useEffect, useState } from 'react';
import hooks from '~/hooks';
import { useVocabularyTopic } from '~/context/VocabularyTopicProvider';
import { useUserMode } from '~/context/UserModeProvider';
import CircularProgress from '../CircularProgress';
import { vocabularyPracticeStatusList } from '~/redux/features/vocabularyPracticeStatusesSlice';
import { statuses } from '~/redux/features/vocabularyPracticeStatusesSlice';

const cx = classNames.bind(styles);

const VocabularyTopic = ({ data }) => {
  const active = useSelector(activeTopic);
  const isAddNew = useSelector(adding);
  const isEdit = useSelector(editing);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(data.name);
  const debouncedValue = hooks.useDebounce(inputValue, 300);
  const { onDelete } = useVocabularyTopic();
  const { isUserMode } = useUserMode();
  const [percentage, setPercentage] = useState(0);
  const vocabularyPracticeStatuses = useSelector(vocabularyPracticeStatusList);
  const vocabularyPracticeStatusesByTopicId = vocabularyPracticeStatuses.filter((vps) => vps.topicId === data.id);

  const handleEdit = (event, topicId) => {
    event.stopPropagation();
    dispatch(toggleEdit({ toggle: true }));
    dispatch(setActive({ id: topicId, name: data.name }));
  };

  const handleDeleteVocabularyTopic = (event, topicId) => {
    event.stopPropagation();
    onDelete(topicId);
  };

  useEffect(() => {
    if (vocabularyPracticeStatusesByTopicId.length > 0) {
      const memorizedCount = vocabularyPracticeStatusesByTopicId.filter(
        (vps) => vps.status === statuses.memorized,
      ).length;

      const percentage = Math.round((memorizedCount / vocabularyPracticeStatusesByTopicId.length) * 100);
      setPercentage(percentage);
    } else {
      setPercentage(0); // Nếu không có dữ liệu, đặt về 0%
    }
  }, [vocabularyPracticeStatusesByTopicId, statuses.memorized]);

  useEffect(() => {
    if (debouncedValue !== data.name) {
      dispatch(updateName({ id: data.id, name: debouncedValue }));
    }
    // eslint-disable-next-line
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
      {!(isUserMode || isEdit || isAddNew) && (
        <div className={cx('button-group')}>
          <Button onClick={(e) => handleEdit(e, data.id)} className={cx('edit-button')} size="lg" variant="success">
            <FontAwesomeIcon icon={faPencil} />
          </Button>
          <Button
            onClick={(e) => handleDeleteVocabularyTopic(e, data.id)}
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

export default VocabularyTopic;
