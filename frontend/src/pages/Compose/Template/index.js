import { faCheck, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import styles from './Template.module.scss';
import Sidebar from '~/components/Compose/Sidebar';
import QuestionGroups from '~/components/Compose/QuestionGroups';
import Header from '~/components/Compose/Header';
import hooks from '~/hooks';
import { isComplete as finished, changeLog, changeQuestions, questionList } from '~/redux/features/testSlice';

import {
  activeGroup,
  addQuestionGroup,
  adding,
  changeQuestionGroups,
  deleteQuestionGroup,
  editing,
  questionGroupList,
  setActive,
  sortQuestionGroupsByName,
  toggleAddNew,
  toggleEdit,
} from '~/redux/features/questionGroupsSilce';

import CustomModal from '~/components/CustomModal';
import Bottombar from '~/components/Compose/Bottombar';
import { questionBundles } from '~/redux/features/questionBundlesSlice';
import Loading from '~/components/Loading';
import BundleCards from '~/components/Compose/BundleCards';
import QuestionSingle from '~/components/Compose/QuestionSingle';
import QuestionBundles from '~/components/Compose/QuestionBundles';

const cx = classNames.bind(styles);

const Template = ({
  isEnablePhoto = false,
  isEnableAudio = false,
  isEnableQuestionText = false,
  isEnableBottombar = false,
  questionBundle = false,
  partName = 'part1_Photos',
  partId = 1,
  quantityOfQuestions,
  quantityOfAnswersPerQuestion,
  quantityOfBundles,
  quantityOfQuestionsPerBundle,
  quote,
}) => {
  const { t } = useTranslation();
  const eventLogs = useSelector(changeLog);
  const dispatch = useDispatch();
  const isAddNew = useSelector(adding);
  const isEdit = useSelector(editing);
  const isComplete = useSelector(finished);

  const active = useSelector(activeGroup);

  const groupName = active.name;
  const groupId = active.id;
  const questionGroups = useSelector(questionGroupList);

  const questions = useSelector(questionList);

  const bundles = useSelector( questionBundles );
  
  const [showSidebar, setShowSidebar] = useState(true);
  const [showBottombar, setShowBottombar] = useState(true);
  const { getQuestionGroups } = hooks.useQuestionService();
  const { getQuestionsByGroupId } = hooks.useQuestionService();
  const [showAskCancel, setShowAskCancel] = useState(false);
  const [isQuestionsLoading, setIsQuestionsLoading] = useState(false);
  const [isQuestionGroupsLoading, setIsQuestionGroupsLoading] = useState(false);
  const newQuestionGroup = hooks.useNewQuestionGroup();

  // fetch questions data
  const fetchQuestions = async (groupId) => {
    const questions = await getQuestionsByGroupId(groupId, isEnableAudio, isEnablePhoto);
    return questions;
  };

  // handle cancel edit/add
  const handleCancel = async () => {
    await fetchQuestions(groupId).then((loadedQuestions) => dispatch(changeQuestions({ questions: loadedQuestions })));
    if (isAddNew) {
      dispatch(toggleAddNew({ toggle: false }));
    }

    if (isEdit) {
      dispatch(toggleEdit({ toggle: false }));
    }
    setShowAskCancel(false);
  };

  // fetch question groups data
  const fetchQuestionGroups = async (partId) => {
    setIsQuestionGroupsLoading(true);
    await getQuestionGroups(partId)
      .then((groups) => {
        dispatch(changeQuestionGroups({ questionGroups: groups }));
        setIsQuestionGroupsLoading(false);
      })
      .catch((e) => console.error(e))
      .finally(() => setIsQuestionGroupsLoading(false));
  };

  // handle cancel add new
  const handleCancelAddNew = () => {
    dispatch(toggleAddNew({ toggle: false }));
    dispatch(deleteQuestionGroup({ groupId: newQuestionGroup.id }));
    fetchQuestions(groupId).then((loadedQuestions) => {
      dispatch(changeQuestions({ questions: loadedQuestions }));
    });
  };

  // handle delete question group
  const handleDeleteQuestionGroup = () => {
    dispatch(changeQuestions({ questions: [] }));
  };

  useEffect(() => {
    if (groupId && !isAddNew) {
      setIsQuestionsLoading(true);
      fetchQuestions(groupId)
        .then((loadedQuestions) => {
          dispatch(
            changeQuestions({
              questions: loadedQuestions.map((question) => ({
                ...question,
                answers: question.answers.map((answer, index) => ({ ...answer, index: index })),
              })),
            }),
          );
          setIsQuestionsLoading(false);
        })
        .catch((e) => console.error(e))
        .finally(() => setIsQuestionsLoading(false));
    }

    // eslint-disable-next-line
  }, [groupId, !isAddNew]);

  useEffect(() => {
    if (eventLogs.length === 0) {
      dispatch(toggleEdit({ toggle: false }));
      dispatch(sortQuestionGroupsByName());
    }

    // eslint-disable-next-line
  }, [eventLogs]);

  // handle on group questions on first time
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchQuestionGroups(partId);
    }

    return () => {
      isMounted = false;
    };

    // eslint-disable-next-line
  }, [partId]);

  useEffect(() => {
    if (isAddNew) {
      dispatch(addQuestionGroup(newQuestionGroup));
      dispatch(setActive(newQuestionGroup));
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

  return (
    <div className={cx('container')}>
      {/* Header */}
      <Header
        className={cx('header', { scaled: showSidebar })}
        title={partName}
        show={showSidebar}
        setShow={setShowSidebar}
      />
      <div className={cx('main', { 'sidebar-scaled': showSidebar, 'bottombar-scaled': showBottombar })}>
        {/* Questions bundle/Question single*/}
        <div className={cx('top')}></div>
        {questionBundle ? (
          <QuestionBundles
            data={bundles}
            isEnableAudio={isEnableAudio}
            isEnablePhoto={isEnablePhoto}
            quantityOfBundles={quantityOfBundles}
            quantityOfQuestionsPerBundle={quantityOfQuestionsPerBundle}
            quantityOfAnswersPerQuestion={quantityOfAnswersPerQuestion}
          />
        ) : (
          <QuestionSingle
            onAddNewSuccess={(data) => dispatch(addQuestionGroup(data))}
            isEnableQuestionText={isEnableQuestionText}
            isQuestionsLoading={isQuestionsLoading}
            questions={questions}
            quote={quote}
            quantityOfAnswersPerQuestion={quantityOfAnswersPerQuestion}
            quantityOfQuestions={quantityOfQuestions}
            isEnableAudio={isEnableAudio}
            isEnablePhoto={isEnablePhoto}
            partId={partId}
          />
        )}
      </div>
      {/* Sidebar: Group question */}
      <Sidebar title={partName} show={showSidebar}>
        {isQuestionGroupsLoading ? (
          <Loading />
        ) : (
          <QuestionGroups
            isComplete={isComplete}
            groupName={groupName}
            groupId={groupId}
            onCancel={handleCancelAddNew}
            onDelete={handleDeleteQuestionGroup}
            data={questionGroups}
          />
        )}
      </Sidebar>

      {isEnableBottombar && (
        <Fragment>
          <Bottombar className={cx('bottom-bar', { scaled: showSidebar })} show={showBottombar}>
            <BundleCards data={bundles} />
          </Bottombar>
          <div
            onClick={() => setShowBottombar((prev) => !prev)}
            className={cx('toggle-bottom-bar-button', {
              scaled: showSidebar,
              offset: !showBottombar,
            })}
          >
            <FontAwesomeIcon icon={showBottombar ? faCheck : faChevronUp} />
          </div>
        </Fragment>
      ) }
      
      {/* Modal ask cancel edit */}
      <CustomModal
        title={t('cancelEdit')}
        body={t('confirmCancelEdit')}
        show={showAskCancel}
        setShow={setShowAskCancel}
        handleAgreeButtonClick={handleCancel}
      />
      <ToastContainer stacked draggable />
    </div>
  );
};

export default Template;
