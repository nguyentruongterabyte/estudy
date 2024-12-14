import { useTranslation } from 'react-i18next';
import { ListGroup } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './VocabularyTopics.module.scss';
import hooks from '~/hooks';

import {
  activeTopic,
  adding,
  editing,
  vocabularyTopicList,
  toggleAddNew,
  updateName,
  addVocabularyTopic,
  setActive,
} from '~/redux/features/vocabularyTopicsSlice';
import CustomModal from '~/components/CustomModal';
import AddButton from '~/components/AddButton';
import { useUserMode } from '~/context/UserModeProvider';
import VocabularyTopic from '../VocabularyTopic';
import NameInputWithButtons from '../NameInputWithButtons';

const cx = classNames.bind(styles);

const fn = () => {};

const VocabularyTopics = ({ isComplete, onCancel = fn, onComplete = fn }) => {
  const data = useSelector(vocabularyTopicList);
  const active = useSelector(activeTopic);
  const isAddNew = useSelector(adding);
  const isEdit = useSelector(editing);
  const topicId = active.id;
  const topicName = active.name;
  const [inputValue, setInputValue] = useState(topicName);
  const debouncedValue = hooks.useDebounce(inputValue, 10);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isUserMode } = useUserMode();
  const newVocabularyTopic = hooks.useNewVocabularyTopic();
  const [showEditModal, setShowEditModal] = useState(false);

  // handle cancel
  const handleCancel = () => {
    onCancel();
    setShowEditModal(false);
  };

  const handleAddNew = () => {
    dispatch(toggleAddNew({ toggle: true }));
    dispatch(addVocabularyTopic({ id: newVocabularyTopic.id, name: newVocabularyTopic.name }));
    dispatch(setActive({ id: newVocabularyTopic.id, name: newVocabularyTopic.name }));
  };

  useEffect(() => {
    if (debouncedValue !== topicName) {
      dispatch(updateName({ id: topicId, name: debouncedValue }));
    }
    // eslint-disable-next-line
  }, [debouncedValue]);

  useEffect(() => {
    setInputValue(topicName);
  }, [topicName]);

  return (
    <div className={cx('container')}>
      <ListGroup as="ul">
        {data.map((questionGroup) => (
          // vocabulary topic item
          <VocabularyTopic data={questionGroup} key={questionGroup.id} />
        ))}
      </ListGroup>
      {!isUserMode && (
        <Fragment>
          {/* Add new question group */}
          {isAddNew && (
            <NameInputWithButtons
              isComplete={isComplete}
              inputValue={inputValue}
              setInputValue={setInputValue}
              onCancel={() => setShowEditModal(true)}
              onComplete={onComplete}
              placeholder={t('enterTopicName')}
            />
          )}
          {!isAddNew && !isEdit && (
            <AddButton onClick={handleAddNew} className={cx('btn-add')}>
              {t('createNewVocabularyTopic')}
            </AddButton>
          )}
          {/* Modal ask cancel edit */}
          <CustomModal
            title={t('cancelEdit')}
            body={t('confirmCancelEdit')}
            show={showEditModal}
            setShow={setShowEditModal}
            handleAgreeButtonClick={handleCancel}
          />
        </Fragment>
      )}
    </div>
  );
};

export default VocabularyTopics;
