import classNames from 'classnames/bind';

import ContentManager from '~/components/ContentManager';
import styles from './Grammar.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  activeGroup,
  addQuestionGroup,
  adding,
  deleteQuestionGroup,
  editing,
  setActive,
  toggleAddNew,
  toggleEdit,
  changeLog as groupChangeLog,
  removeChangeLogsByField as questionGroupRemoveChangeLogsByField,
  sortQuestionGroupsByName,
  questionGroupList,
  addQuestionGroups,
} from '~/redux/features/questionGroupsSilce';
import {
  changeLog,
  changeQuestions,
  isComplete as finished,
  questionList,
  removeChangeLogsByField,
  resetChangeLog,
} from '~/redux/features/questionsSingleSlice';
import { Fragment, useEffect, useState } from 'react';
import hooks from '~/hooks';
import {
  activeGrammar as activeG,
  addGrammar,
  changeGrammars,
  deleteGrammar,
  grammarList,
  sortGrammarsByName,
} from '~/redux/features/grammarsSlice';
import logFields from '~/redux/logFields';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import handleLastChanges from '~/components/QuestionSingle/handleLastChanges';
import { getWithExpiry, setWithExpiry } from '~/utils/localStorageUtils';
import CustomAccordion from '~/components/CustomAccordion';
import QuestionGroups from '~/components/QuestionGroups';
import QuestionGroupProvider from '~/context/QuestionGroupProvider';
import AddButton from '~/components/AddButton';
import { useUserMode } from '~/context/UserModeProvider';

// Grammar Accordion
import {
  adding as grammarAdding,
  editing as grammarEditing,
  toggleAddNew as grammarToggleAddNew,
  toggleEdit as grammarToggleEdit,
  setActive as grammarSetActive,
  finished as grammarFinished,
  updateName as grammarUpdateName,
  toggleComplete as grammarToggleComplete,
} from '~/redux/features/grammarsSlice';
import NameInputWithButtons from '~/components/NameInputWithButtons';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import QuestionSingle from '~/components/QuestionSingle';
import Loading from '~/components/Loading';
import Timer from '~/components/Timer';
import QuestionsCard from '~/components/QuestionsCard';
import { groups } from '~/redux/features/userAnswersSlice';
import ShufflingProvider from '~/context/ShufflingProvider';

const cx = classNames.bind(styles);

const Grammar = ({ isUser }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const isEdit = useSelector(editing);
  const isAddNew = useSelector(adding);
  const isComplete = useSelector(finished);

  const active = useSelector(activeGroup);
  const activeGrammar = useSelector(activeG);
  const eventLogs = useSelector(changeLog);
  const questions = useSelector(questionList);
  const questionGroupEventLogs = useSelector(groupChangeLog);
  const questionGroups = useSelector(questionGroupList);

  const groupName = active.name;

  const [groupId, setGroupId] = useState(active.id);
  const [isQuestionsLoading, setIsQuestionsLoading] = useState(false);

  const [showAskCancel, setShowAskCancel] = useState(false);
  const [showDeleteQuestionGroupModal, setShowDeleteQuestionGroupModal] = useState(false);
  const [showDeleteGrammarModal, setShowDeleteGrammarModal] = useState(false);

  const [newHistory, setNewHistory] = useState([]);
  const [isQuestionGroupsLoading, setIsQuestionGroupsLoading] = useState(false);
  const [isGrammarLoading, setIsGrammarLoading] = useState(false);
  const { saveItem: saveNewItem, removeItem: removeNewItem } = hooks.useSaveData('new_grammar');

  const { updateCorrectAnswers, updateMany, getQuestionGroupsByGrammarId, getQuestionsByGroupId } =
    hooks.useQuestionService();
  const { updateAnswers } = hooks.useAnswerService();
  const { updateQuestionGroup } = hooks.useQuestionGroupService();
  const { createTest } = hooks.useTestService();
  const newQuestionGroup = hooks.useNewQuestionGroup();
  const { getAllGrammars, destroyGrammar } = hooks.useGrammarService();
  const { deleteTest } = hooks.useTestService();
  const [grammarId, setGrammarId] = useState(activeGrammar.id);
  const [showTimer, setShowTimer] = useState(false);
  const { saveItem: saveTimer, getItem: getTimer } = hooks.useSaveData('time_colapsed');
  const [initialTimer, setInitialTimer] = useState(0);
  const [isPractice, setIsPractice] = useState(false);
  const [alwaysOpen, setAlwaysOpen] = useState(false);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(-1);
  const userAnswers = useSelector(groups);
  const { createTestTimer } = hooks.useTestTimerService();

  const handleActiveQuestion = (questionIndex) => {
    setActiveQuestionIndex(questionIndex);
  };

  const handleReviewTest = () => {
    setAlwaysOpen(true);
  };
  // handle continue test
  const handleContinueTest = () => {
    const timer = getTimer(groupId);
    setInitialTimer(timer);
    setShowTimer(true);
  };

  // handle start practice
  const handleStartPractice = () => {
    setShowTimer(true);
  };

  // save timer
  const handleTimerChange = (secondsElapsed) => {
    if (secondsElapsed !== 0) {
      saveTimer(groupId, secondsElapsed);
    }
  };

  // fetch questions data
  const fetchQuestions = async (groupId) => {
    const questions = await getQuestionsByGroupId(groupId, false, false);
    return questions;
  };

  // fetch question groups data
  const fetchQuestionGroups = async (grammarId) => {
    setIsQuestionGroupsLoading(true);
    const questionGroups = await getQuestionGroupsByGrammarId(grammarId);
    setIsQuestionGroupsLoading(false);
    return questionGroups;
  };

  // fetch grammars
  const fetchGrammars = async () => {
    setIsGrammarLoading(true);
    const grammars = await getAllGrammars();
    setIsGrammarLoading(false);
    return grammars;
  };

  const handleLoading = async () => {
    setIsQuestionsLoading(true);
    fetchQuestions(groupId)
      .then((loadedQuestions) => {
        dispatch(
          changeQuestions({
            questions: loadedQuestions.map((question) => ({
              ...question,
              answers: question.answers.map((answer, index) => ({ ...answer, index })),
            })),
          }),
        );
        setIsQuestionsLoading(false);
      })
      .catch((e) => console.error(e))
      .finally(() => setIsQuestionsLoading(false));
  };

  // handle cancel edit/add
  const handleCancel = async () => {
    handleLoading();
    if (isAddNew) {
      dispatch(toggleAddNew({ toggle: false }));
      dispatch(deleteQuestionGroup({ groupId: newQuestionGroup.id }));
      removeNewItem(grammarId);
    }

    if (isEdit) {
      dispatch(toggleEdit({ toggle: false }));
    }
    setShowAskCancel(false);
  };

  // handle create test
  const handleCreateTest = async () => {
    // create question group, questions
    const questionsData = {
      name: groupName ? groupName : 'New Practice',
      grammarId: activeGrammar.id,
      questions: questions,
    };
    const newTest = await createTest(questionsData);
    return newTest;
  };

  // handle add new
  // handle question single add new
  const handleAddNew = async () => {
    // create question group, questions
    const newTest = await handleCreateTest();

    const newQuestions = newTest.questions;
    dispatch(changeQuestions({ questions: newQuestions }));
    dispatch(addQuestionGroup({ id: newTest.questionGroup.id, name: newTest.questionGroup.name }));
    dispatch(deleteQuestionGroup({ groupId: newQuestionGroup.id }));
    dispatch(toggleAddNew({ toggle: false }));
    dispatch(setActive({ id: newTest.questionGroup.id, name: newTest.questionGroup.name }));
    dispatch(resetChangeLog());
  };

  // handle edit
  const handleEdit = async () => {
    const history = getWithExpiry(`editHistory_${groupId}`) || [];

    // Question Group Name
    const questionGroupNameLogs = questionGroupEventLogs.filter((log) => log.field === logFields.questionGroupName);
    if (questionGroupNameLogs.length > 0) {
      const firstChange = questionGroupNameLogs[0];
      const lastChange = questionGroupNameLogs[questionGroupNameLogs.length - 1];

      let lastChanges = firstChange.oldValue === lastChange.newValue ? null : lastChange;
      if (lastChanges !== null) {
        // handle change name
        await toast.promise(updateQuestionGroup({ id: groupId, name: lastChanges.newValue }), {
          pending: t('updatingQuestionGroupName'),
          success: t('updatedQuestionGroupNameSuccessfully'),
          error: t('errorUpdatingQuestionGroupName'),
        });
      }
      dispatch(questionGroupRemoveChangeLogsByField({ field: logFields.questionGroupName }));
      setNewHistory((prev) => [...prev, { type: logFields.questionGroupName, changes: questionGroupNameLogs }]);
    }

    console.log('Question group name last changes: ', questionGroupNameLogs);

    // Handle update Answers if have changed
    const answerLastChanges = handleLastChanges.answers(eventLogs);
    const answers = answerLastChanges.map((change) => ({
      id: change.answerId,
      answer: change.newValue,
      questionId: change.questionId,
    }));

    if (answers.length > 0) {
      await toast
        .promise(updateAnswers(answers), {
          pending: t('updatingAnswers'),
          success: t('updatedAnswersSuccessfully'),
          error: t('errorUpdatingAnswers'),
        })
        .then(() => {
          dispatch(removeChangeLogsByField({ field: logFields.answer }));
          setNewHistory((prev) => [...prev, { type: logFields.answer, changes: answerLastChanges }]);
        });
    }
    console.log('Answers last changes: ', answerLastChanges);

    //Handle update correct Answers if have changed
    const correctAnswerLastChanges = handleLastChanges.correctAnswers(eventLogs);
    const correctAnswers = correctAnswerLastChanges.map((change) => ({
      answerId: change.newValue,
      questionId: change.questionId,
    }));

    console.log('correctAnswers', correctAnswers);

    if (correctAnswers.length > 0) {
      await toast
        .promise(updateCorrectAnswers(correctAnswers), {
          pending: t('updatingCorrectAnswers'),
          success: t('updatedCorrectAnswersSuccessfully'),
          error: t('errorUpdatingCorrectAnswers'),
        })
        .then(() => {
          dispatch(removeChangeLogsByField({ field: logFields.correctAnswer }));
          setNewHistory((prev) => [...prev, { type: logFields.correctAnswer, changes: correctAnswerLastChanges }]);
        });
    }
    console.log('Correct answers last changes: ', correctAnswerLastChanges);

    // Question Text
    const questionTextsLastChanges = handleLastChanges.questionText(eventLogs);
    const questions = questionTextsLastChanges.map((change) => ({
      id: change.questionId,
      question: change.newValue,
    }));

    if (questions.length > 0) {
      await toast
        .promise(updateMany(questions), {
          pending: t('changingQuestions'),
          success: t('changeQuestionsSuccess'),
          error: t('changeQuestionsError'),
        })
        .then(() => {
          dispatch(removeChangeLogsByField({ field: logFields.questionText }));
          setNewHistory((prev) => [...prev, { type: logFields.questionText, changes: questionTextsLastChanges }]);
        })
        .catch((e) => console.error(e));
    }

    console.log('question texts last changes: ', questionTextsLastChanges);

    if (eventLogs.length === 0) dispatch(toggleEdit({ toggle: false }));

    const updatedHistory = [...history, ...newHistory];
    setWithExpiry(`editHistory_${groupId}`, updatedHistory);
  };

  // handle complete
  const handleComplete = () => {
    if (eventLogs.length === 0) dispatch(toggleEdit({ toggle: false }));

    if (isAddNew) handleAddNew();
    if (isEdit) handleEdit();
  };

  // handle cancel add new question group
  const handleCancelAddNewQuestionGroup = () => {
    dispatch(toggleAddNew({ toggle: false }));
    dispatch(deleteQuestionGroup({ groupId: newQuestionGroup.id }));
    handleLoading();
    removeNewItem(activeGrammar.id);
  };

  const handleDeleteQuestionGroup = async () => {
    await toast
      .promise(deleteTest(groupId), {
        pending: t('deletingQuestionGroup'),
        success: t('deletedQuestionGroupSuccessfully'),
        error: t('failedToDeleteQuestionGroup'),
      })
      .then(() => {
        dispatch(deleteQuestionGroup({ groupId }));
      });

    setShowDeleteQuestionGroupModal(false);

    dispatch(changeQuestions({ questions: [] }));
  };

  const handleDeleteGrammar = async () => {
    await toast
      .promise(destroyGrammar(grammarId), {
        pending: t('deletingGrammar'),
        success: t('deleteGrammarSuccess'),
        error: t('deleteGrammarError'),
      })
      .then(() => {
        dispatch(deleteGrammar({ grammarId }));
      });
    setShowDeleteGrammarModal(false);
  };

  const handleGrammarHeaderClick = async (grammarId) => {
    if (grammarId) {
      const isFetched = questionGroups.some((qg) => qg.grammarId === grammarId);
      console.log(isFetched);
      if (!isFetched) {
        const questionGroupsF = await fetchQuestionGroups(grammarId);
        console.log(questionGroupsF);
        dispatch(addQuestionGroups({ questionGroups: questionGroupsF }));
      }
    }
  };

  useEffect(() => {
    // toggle edit to false when event logs are empty
    if (eventLogs.length === 0) {
      dispatch(toggleEdit({ toggle: false }));
      dispatch(sortQuestionGroupsByName());
    }

    // eslint-disable-next-line
  }, [eventLogs]);

  useEffect(() => {
    if (groupId && !isAddNew) {
      handleLoading();
    }
    // eslint-disable-next-line
  }, [groupId, isAddNew]);

  useEffect(() => {
    setGroupId(active.id);
  }, [active]);

  useEffect(() => {
    if (isAddNew) {
      dispatch(addQuestionGroup({ id: newQuestionGroup.id, name: newQuestionGroup.name }));
      dispatch(setActive({ id: newQuestionGroup.id, name: newQuestionGroup.name }));
    }
    // eslint-disable-next-line
  }, [isAddNew]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      if (key === 'Escape') if (isAddNew || isEdit) setShowAskCancel(true);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAddNew, isEdit]);

  useEffect(() => {
    if (isAddNew) saveNewItem(activeGrammar.id, { questions });
    // eslint-disable-next-line
  }, [isAddNew, questions, activeGrammar.id]);

  useEffect(() => {
    fetchGrammars().then((grammars) => {
      dispatch(changeGrammars({ grammars }));
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setIsPractice(false);
    setShowTimer(false);
    setInitialTimer(0);
  }, [active]);

  // handle complete test
  useEffect(() => {
    const createTimer = async (groupId) => {
      const secondsElapsed = getTimer(groupId);
      await createTestTimer(groupId, secondsElapsed);
    };
    if (isPractice) {
      const groupUserAnswers = userAnswers.find((uas) => uas.id === groupId).userAnswers;
      const isCompleted = groupUserAnswers.every((ua) => ua.userAnswerId);
      if (isCompleted) {
        createTimer(groupId)
          .then(() => setShowTimer(false))
          .catch((e) => console.error(e))
          .finally(() => setShowTimer(false));
        // Tạo thêm nút xem kết quả vả set show nó thành true ở chỗ này
      }
    }
    // eslint-disable-next-line
  }, [userAnswers, isPractice, groupId]);

  return (
    <ContentManager
      className={cx('container')}
      isUser={isUser}
      isEdit={isEdit}
      isAddNew={isAddNew}
      isComplete={isComplete}
      headerTitle={isEdit || isAddNew ? activeGrammar.name : 'grammar'}
      onHeaderCancel={handleCancel}
      onHeaderComplete={handleComplete}
      sidebarTitle="grammar"
      sidebarChildren={
        <Fragment>
          {isGrammarLoading ? (
            <Loading />
          ) : (
            <GrammarAccordion
              isQuestionGroupsLoading={isQuestionGroupsLoading}
              setShowAskCancel={setShowAskCancel}
              onCancelAddNewQuestionGroup={handleCancelAddNewQuestionGroup}
              onDeleteQuestionGroup={(groupId) => {
                setShowDeleteQuestionGroupModal(true);
                setGroupId(groupId);
              }}
              onDelete={(grammarId) => {
                setShowDeleteGrammarModal(true);
                setGrammarId(grammarId);
              }}
              onHeaderClick={handleGrammarHeaderClick}
            />
          )}
        </Fragment>
      }
      mainChildren={
        <div className={cx('main')}>
          <ShufflingProvider isShufflingAnswersEnabled={true} isShufflingQuestionsEnabled={true}>
            {showTimer ? (
              <Timer className={cx('timer')} onTimerChange={handleTimerChange} initialSeconds={initialTimer} />
            ) : (
              isPractice && (
                <Button size="lg" className={cx('show-result-btn')} onClick={() => setIsPractice(false)}>
                  {t('showResult')}
                </Button>
              )
            )}
            <QuestionSingle
              activeQuestionIndex={activeQuestionIndex}
              alwaysOpen={alwaysOpen}
              isPractice={isPractice}
              setIsPractice={setIsPractice}
              onReviewTest={handleReviewTest}
              onContinueTest={handleContinueTest}
              onStartPractice={handleStartPractice}
              isEnableExplainText={true}
              isEnableQuestionText={true}
              isQuestionsLoading={isQuestionsLoading}
              questions={questions}
              quote={'quote5'}
              quantityOfAnswersPerQuestion={4}
              quantityOfQuestions={20}
              isEnableAudio={false}
              isEnablePhoto={false}
              isGrammar={true}
              grammarId={grammarId}
            />
          </ShufflingProvider>
        </div>
      }
      isEnableBottombar={true}
      bottombarChildren={<QuestionsCard onActiveQuestion={handleActiveQuestion} />}
      modalData={[
        {
          title: 'cancelEdit',
          body: 'confirmCancelEdit',
          show: showAskCancel,
          setShow: setShowAskCancel,
          handleAgreeButtonClick: handleCancel,
        },
        {
          title: 'deleteQuestionGroup',
          body: 'confirmDeleteQuestionGroup',
          show: showDeleteQuestionGroupModal,
          setShow: setShowDeleteQuestionGroupModal,
          handleAgreeButtonClick: handleDeleteQuestionGroup,
        },
        {
          title: 'deleteGrammar',
          body: 'confirmDeleteGrammar',
          show: showDeleteGrammarModal,
          setShow: setShowDeleteGrammarModal,
          handleAgreeButtonClick: handleDeleteGrammar,
        },
      ]}
    />
  );
};

const GrammarAccordion = ({
  onDeleteQuestionGroup,
  onCancelAddNewQuestionGroup,
  onDelete,
  onHeaderClick,
  setShowAskCancel,
  isQuestionGroupsLoading,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const grammars = useSelector(grammarList);
  const { isUserMode } = useUserMode();
  const active = useSelector(activeG);
  const isAddNew = useSelector(grammarAdding);
  const isEdit = useSelector(grammarEditing);
  const isQuestionsAddNew = useSelector(adding);
  const isQuestionsEdit = useSelector(editing);
  const newGrammar = hooks.useNewGrammar();
  const isComplete = useSelector(grammarFinished);
  const [inputValue, setInputValue] = useState(newGrammar.name);
  const debouncedValue = hooks.useDebounce(inputValue, 300);
  const { saveGrammar } = hooks.useGrammarService();

  // handle cancel add new
  const handleCancelAddNew = () => {
    dispatch(grammarToggleAddNew({ toggle: false }));
    dispatch(deleteGrammar({ grammarId: newGrammar.id }));
  };

  // handle when is adding
  const handleAddNew = () => {
    dispatch(grammarToggleAddNew({ toggle: true }));
    dispatch(addGrammar({ id: newGrammar.id, name: newGrammar.name }));
    dispatch(grammarSetActive({ id: newGrammar.id, name: newGrammar.name }));
  };

  // handle add new grammar
  const handleAddNewGrammar = async () => {
    const data = await saveGrammar({ name: inputValue });
    dispatch(deleteGrammar({ grammarId: newGrammar.id }));
    dispatch(addGrammar({ id: data.id, name: data.name }));
    dispatch(grammarToggleAddNew({ toggle: false }));
    dispatch(sortGrammarsByName());
  };

  useEffect(() => {
    if (debouncedValue !== active.name) dispatch(grammarUpdateName({ id: active.id, name: debouncedValue }));
    // eslint-disable-next-line
  }, [debouncedValue]);

  useEffect(() => {
    if (active && active.name !== inputValue) setInputValue(active.name);
    // eslint-disable-next-line
  }, [active]);

  // validate
  useEffect(() => {
    dispatch(grammarToggleComplete({ toggle: inputValue && inputValue.trim() !== '' }));
    // eslint-disable-next-line
  }, [inputValue]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      if (key === 'Escape') if (isAddNew || isEdit) setShowAskCancel(true);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line
  }, [isAddNew, isEdit]);

  return (
    <div className={cx('grammar-accordion-container')}>
      <CustomAccordion
        className={cx('accordion')}
        items={grammars.map((grammar) => ({
          header: <GrammarHeader data={grammar} onDelete={onDelete} onHeaderClick={onHeaderClick} />,
          body: isQuestionGroupsLoading ? (
            <Loading className={cx('loading')} />
          ) : (
            <GrammarBody
              grammar={grammar}
              onDeleteQuestionGroup={onDeleteQuestionGroup}
              onCancelAddNew={onCancelAddNewQuestionGroup}
            />
          ),
        }))}
      />
      {!isUserMode && (
        <Fragment>
          {/* Add new grammar */}
          {isAddNew && (
            <NameInputWithButtons
              isComplete={isComplete}
              inputValue={inputValue}
              setInputValue={setInputValue}
              onCancel={handleCancelAddNew}
              onComplete={handleAddNewGrammar}
            />
          )}
          {!(isAddNew || isEdit || isQuestionsAddNew || isQuestionsEdit) && (
            <AddButton onClick={handleAddNew} className={cx('btn-add')}>
              {t('createNewGrammar')}
            </AddButton>
          )}
        </Fragment>
      )}
    </div>
  );
};

const fn = () => {};
const GrammarHeader = ({ data, onDelete = fn, onHeaderClick = fn }) => {
  const dispatch = useDispatch();
  const isAddNew = useSelector(adding);
  const isEdit = useSelector(editing);
  const isGrammarAddNew = useSelector(grammarAdding);
  const isGrammarEdit = useSelector(grammarEditing);
  const { isUserMode } = useUserMode();
  const activeGrammar = useSelector(activeG);
  const isComplete = useSelector(grammarFinished);
  const [inputValue, setInputValue] = useState(data.name);
  const debouncedValue = hooks.useDebounce(inputValue, 300);
  const { updateGrammar } = hooks.useGrammarService();

  // handle delete grammar
  const handleDeleteGrammar = (e, grammarId) => {
    e.stopPropagation();
    onDelete(grammarId);
  };

  // handle toggle edit
  const handleEdit = (e, grammarId, name) => {
    e.stopPropagation();
    dispatch(grammarToggleEdit({ toggle: true }));
    dispatch(grammarSetActive({ id: grammarId, name }));
  };

  const handleComplete = async () => {
    await updateGrammar({ id: activeGrammar.id, name: inputValue });
    dispatch(grammarToggleEdit({ toggle: false }));
  };

  useEffect(() => {
    if (isGrammarEdit && activeGrammar && debouncedValue !== activeGrammar.name) {
      dispatch(grammarUpdateName({ id: activeGrammar.id, name: debouncedValue }));
    }
    // eslint-disable-next-line
  }, [debouncedValue, isGrammarEdit]);

  useEffect(() => {
    dispatch(grammarToggleComplete({ toggle: inputValue && inputValue.trim() !== '' }));
    // eslint-disable-next-line
  }, [inputValue]);

  useEffect(() => {
    if (activeGrammar) setInputValue(activeGrammar.name);
  }, [activeGrammar]);

  return (
    <div className={cx('grammar-header-container')} onClick={() => onHeaderClick(data.id)}>
      {isGrammarEdit && activeGrammar.id === data.id ? (
        <NameInputWithButtons
          isComplete={isComplete}
          inputValue={inputValue}
          setInputValue={setInputValue}
          onCancel={() => dispatch(grammarToggleEdit({ toggle: false }))}
          onComplete={handleComplete}
        />
      ) : (
        <h3>{data.name}</h3>
      )}
      {!(isUserMode || isEdit || isAddNew || isGrammarAddNew || isGrammarEdit) && (
        <div className={cx('button-group')}>
          <Button
            onClick={(e) => handleEdit(e, data.id, data.name)}
            className={cx('edit-button')}
            size="lg"
            variant="success"
          >
            <FontAwesomeIcon icon={faPencil} />
          </Button>
          <Button
            onClick={(e) => handleDeleteGrammar(e, data.id)}
            className={cx('delete-button')}
            size="lg"
            variant="danger"
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
      )}
    </div>
  );
};

const GrammarBody = ({ onDeleteQuestionGroup, onCancelAddNew, grammar }) => {
  const isComplete = useSelector(finished);

  return (
    <div className={cx('grammar-body-container')}>
      <QuestionGroupProvider onDelete={onDeleteQuestionGroup}>
        <QuestionGroups onCancel={onCancelAddNew} isComplete={isComplete} isGrammar={true} grammar={grammar} />
      </QuestionGroupProvider>
    </div>
  );
};

export default Grammar;
