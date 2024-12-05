import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { Button, Form, ListGroup } from 'react-bootstrap';
import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './QuestionGroups.module.scss';
import QuestionGroup from '~/components/QuestionGroup';
import hooks from '~/hooks';
import { resetChangeLog } from '~/redux/features/testSlice';

import { resetChangeLog as resetBundleChangeLog } from '~/redux/features/questionBundlesSlice';

import {
  activeGroup,
  adding,
  editing,
  questionGroupList,
  toggleAddNew,
  updateName,
} from '~/redux/features/questionGroupsSilce';
import CustomModal from '~/components/CustomModal';
import AddButton from '~/components/AddButton';
import { useUserMode } from '~/context/UserModeProvider';
import {
  activeGrammar as activeG,
  setActive,
  adding as grammarAdding,
  editing as grammarEditing,
} from '~/redux/features/grammarsSlice';
import NameInputWithButtons from '../NameInputWithButtons';

const cx = classNames.bind(styles);

const fn = () => {};

const QuestionGroups = ({ isComplete, isGrammar = false, grammar, onCancel = fn, onComplete = fn }) => {
  const questionGroups = useSelector(questionGroupList);
  const [data, setData] = useState(questionGroups);
  const active = useSelector(activeGroup);
  const isGrammarAddNew = useSelector(grammarAdding);
  const isGrammarEdit = useSelector(grammarEditing);
  const isAddNew = useSelector(adding);
  const isEdit = useSelector(editing);
  const groupId = active.id;
  const groupName = active.name;
  const [inputValue, setInputValue] = useState(groupName);
  const debouncedValue = hooks.useDebounce(inputValue, 10);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isUserMode } = useUserMode();
  const [showEditModal, setShowEditModal] = useState(false);
  const activeGrammar = useSelector(activeG);

  // handle cancel
  const handleCancel = () => {
    onCancel();
    setShowEditModal(false);
  };

  const handleAddNew = () => {
    dispatch(toggleAddNew({ toggle: true }));
    dispatch(resetChangeLog());
    dispatch(resetBundleChangeLog());
    if (isGrammar) {
      dispatch(setActive({ id: grammar.id, name: grammar.name }));
    }
  };

  useEffect(() => {
    if (debouncedValue !== groupName) {
      console.log(groupId, groupName);
      console.log(data);
      dispatch(updateName({ id: groupId, name: debouncedValue }));
    }
    // eslint-disable-next-line
  }, [debouncedValue]);

  useEffect(() => {
    setInputValue(groupName);
  }, [groupName]);

  useEffect(() => {
    if (isGrammar) {
      setData([...questionGroups.filter((questionGroup) => questionGroup.grammarId === grammar.id)]);
    }
    // eslint-disable-next-line
  }, [isGrammar, questionGroups]);

  return (
    <div className={cx('container')}>
      <ListGroup as="ul">
        {data.map((questionGroup) => (
          // Question group item
          <QuestionGroup data={questionGroup} key={questionGroup.id} />
        ))}
      </ListGroup>
      {!isUserMode && (
        <Fragment>
          {isAddNew && (isGrammar ? activeGrammar.id === grammar.id : true) && (
            <NameInputWithButtons
              isComplete={isComplete}
              inputValue={inputValue}
              setInputValue={setInputValue}
              onCancel={() => setShowEditModal(true)}
              onComplete={onComplete}
              placeholder={t('enterQuestionGroupName')}
            />
          )}

          {!isAddNew && !isEdit && !isGrammarAddNew && !isGrammarEdit && (
            <AddButton onClick={handleAddNew} className={cx('btn-add')}>
              {t('createNewTest')}
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

export default QuestionGroups;
