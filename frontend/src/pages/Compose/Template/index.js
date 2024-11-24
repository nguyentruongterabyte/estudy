import { faCheck, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import styles from './Template.module.scss';
import Sidebar from '~/components/Compose/Sidebar';
import QuestionGroups from '~/components/Compose/QuestionGroups';
import Header from '~/components/Compose/Header';
import hooks from '~/hooks';
import {
  isComplete as finished,
  changeLog,
  changeQuestions,
  questionList,
  updateQuestionPhoto,
  updateQuestionAudio,
  resetChangeLog,
  removeChangeLogsByField,
} from '~/redux/features/testSlice';
import { finished as bundleFinished, changeLog as bundleChangeLog } from '~/redux/features/questionBundlesSlice';

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
  changeLog as groupChangeLog,
  removeChangeLogsByField as questionGroupRemoveChangeLogsByField,
} from '~/redux/features/questionGroupsSilce';

import CustomModal from '~/components/CustomModal';
import Bottombar from '~/components/Compose/Bottombar';
import { questionBundles } from '~/redux/features/questionBundlesSlice';
import Loading from '~/components/Loading';
import BundleCards from '~/components/Compose/BundleCards';
import QuestionSingle from '~/components/Compose/QuestionSingle';
import QuestionBundles from '~/components/Compose/QuestionBundles';
import { getWithExpiry, setWithExpiry } from '~/utils/localStorageUtils';
import handleLastChanges from '~/components/Compose/QuestionSingle/handleLastChanges';
import logFields from '~/redux/logFields';

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
  const { uploadPhoto, createPhoto, updatePhotos } = hooks.usePhotoService();
  const { uploadAudio, createAudio, updateAudios } = hooks.useAudioService();
  const { createTest } = hooks.useTestService();
  const { createQuestionPhoto, createQuestionAudio, updateCorrectAnswers, updateMany } = hooks.useQuestionService();
  const { updateAnswers } = hooks.useAnswerService();
  const { updateQuestionGroup } = hooks.useQuestionGroupService();

  const { t } = useTranslation();
  const eventLogs = useSelector(changeLog);
  const dispatch = useDispatch();
  const isAddNew = useSelector(adding);
  const isEdit = useSelector(editing);

  const questionGroupEventLogs = useSelector(groupChangeLog);
  const isSingleComplete = useSelector(finished);
  const isBunldeComplete = useSelector(bundleFinished);

  const isComplete = isSingleComplete || isBunldeComplete;

  const active = useSelector(activeGroup);

  const groupName = active.name;
  const groupId = active.id;
  const questionGroups = useSelector(questionGroupList);

  const questions = useSelector(questionList);

  const bundles = useSelector(questionBundles);

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

  // handle complete
  const handleComplete = () => {
    if (isAddNew) handleAddNew();
    if (isEdit) handleEdit();
  };

  // handle add new
  const handleAddNew = () => {
    if (questionBundle) {
      handleQuestionBundleAddNew();
    } else {
      handleQuestionSingleAddNew();
    }
  };

  // handle upload media file into firebase
  const uploadMediaFiles = async (files, type) => {
    switch (type) {
      case 'photo':
        // handle upload photo file and get their urls
        const filePaths = await Promise.all(
          files.map(async (file) => {
            const filePath = await uploadPhoto(file);
            return filePath;
          }),
        );
        return filePaths;
      case 'audio':
        // handle upload audio file and get their urls
        const audioLinks = await Promise.all(
          files.map(async (file) => {
            const audioLink = await uploadAudio(file);
            return audioLink;
          }),
        );
        return audioLinks;
      default:
        throw new Error('Type not found!');
    }
  };

  // handle create test
  const handleCreateTest = async (type) => {
    switch (type) {
      case 'single':
        // create question group, questions
        const questionsData = {
          name: groupName ? groupName : 'New test',
          partId: partId,
          questions: questions.map((question) => {
            const { photo, photoId, audioId, audio, ...questionWithoutMedia } = question;
            return questionWithoutMedia;
          }),
        } 
        const newTest = await createTest(questionsData);
        return newTest;
      case 'bundle':
        // create question group, bundles, questions
        let bundlesData = {
          name: groupName ? groupName : 'New test',
          partId: partId,
          bundles: bundles.map( bundle => ( {
            text: bundle.text,
            questions: bundle.questions.map( question => ( {
              question: question.question,
              correctAnswerIndex: question.correctAnswerIndex,
              answers: question.answers.map( answer => ( {
                answer: answer.answer
              }))
            }))
          }))
        };

        // async function save bundle test ...
        break;
      default:
        throw new Error( 'Test type not found' );
    }
  }

  // handle edit
  const handleEdit = () => {
    if (questionBundle) {
      handleQuestionBundleEdit();
    } else {
      handleQuestionSingleEdit();
    }
  };

  // handle question bundle add new
  const handleQuestionBundleAddNew = async () => {
    console.log( bundles );
    // create url from upload firebase
    let photoFiles = [];
    let audioFiles = [];
    let filePaths = [];
    let audioLinks = [];

    if ( isEnablePhoto ) {
      bundles.forEach( ( bundle ) => {
        if ( bundle.isEnablePhoto )
          photoFiles.push( bundle.photo )
      } );

      filePaths = await toast.promise(uploadMediaFiles(photoFiles, 'photo'), {
        pending: t('uploadingMediaForQuestion'),
        success: t('uploadedMediaForQuestion'),
        error: t('failedToUploadMediaForQuestion'),
      });
    }

    if ( isEnableAudio ) {
      bundles.forEach((bundle) => audioFiles.push(bundle.audio));
      audioLinks = await toast.promise(uploadMediaFiles(audioFiles, 'audio'), {
        pending: t('uploadingMediaForQuestion'),
        success: t('uploadedMediaForQuestion'),
        error: t('failedToUploadMediaForQuestion'),
      });
    }
  };

  // handle question single add new
  const handleQuestionSingleAddNew = async () => {
    // create url from upload firebase
    let photoFiles = [];
    let audioFiles = [];
    let filePaths = [];
    let audioLinks = [];

    if (isEnablePhoto) {
      questions.forEach((question) => photoFiles.push(question.photo));
      filePaths = await toast.promise(uploadMediaFiles(photoFiles, 'photo'), {
        pending: t('uploadingMediaForQuestion'),
        success: t('uploadedMediaForQuestion'),
        error: t('failedToUploadMediaForQuestion'),
      });
    }

    if (isEnableAudio) {
      questions.forEach((question) => audioFiles.push(question.audio));
      audioLinks = await toast.promise(uploadMediaFiles(audioFiles, 'audio'), {
        pending: t('uploadingMediaForQuestion'),
        success: t('uploadedMediaForQuestion'),
        error: t('failedToUploadMediaForQuestion'),
      });
    }

    // create question group, questions
    const newTest = await handleCreateTest( 'single' );
    dispatch(changeQuestions({ questions: newTest.questions }));
    
    // Create photo, audio for each new question
    await Promise.all(
      newTest.questions.map(async (question, index) => {
        // compose photo and audios
        let questionWithMedias = { ...question };
        if (isEnablePhoto) {
          const newPhoto = await createPhoto(filePaths[index]);
          await createQuestionPhoto(question.id, newPhoto.id);
          questionWithMedias.photo = newPhoto.filePath;
          dispatch(updateQuestionPhoto({ questionId: question.id, photo: newPhoto.filePath }));
        }
        if (isEnableAudio) {
          const newAudio = await createAudio(audioLinks[index]);
          await createQuestionAudio(question.id, newAudio.id);
          questionWithMedias.audio = newAudio.audioLink;
          dispatch(updateQuestionAudio({ questionId: question.id, audio: newAudio.audioLink }));
        }
        return questionWithMedias;
      }),
    )
      .then(() => {
        dispatch(addQuestionGroup({ id: newTest.questionGroup.id, name: newTest.questionGroup.name }));
        dispatch(deleteQuestionGroup({ groupId: newQuestionGroup.id }));
        dispatch(toggleAddNew({ toggle: false }));
        dispatch(setActive({ id: newTest.questionGroup.id, name: newTest.questionGroup.name }));
        dispatch(resetChangeLog());
      })
      .catch((e) => console.error(e));
  };

  // handle edit question bundle
  const handleQuestionBundleEdit = async () => {};

  // handle edit question single
  const handleQuestionSingleEdit = async () => {
    const history = getWithExpiry(`editHistory_${groupId}`) || [];
    const newHistory = [];
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
          newHistory.push({ type: logFields.answer, changes: answerLastChanges });
        });
    }
    console.log('Answers last changes: ', answerLastChanges);

    //Handle update correct Answers if have changed
    const correctAnswerLastChanges = handleLastChanges.correctAnswers(eventLogs);
    const correctAnswers = correctAnswerLastChanges.map((change) => ({
      answerId: change.newValue,
      questionId: change.questionId,
    }));

    if (correctAnswers.length > 0) {
      await toast
        .promise(updateCorrectAnswers(correctAnswers), {
          pending: t('updatingCorrectAnswers'),
          success: t('updatedCorrectAnswersSuccessfully'),
          error: t('errorUpdatingCorrectAnswers'),
        })
        .then(() => {
          dispatch(removeChangeLogsByField({ field: logFields.correctAnswer }));
          newHistory.push({ type: logFields.correctAnswer, changes: correctAnswerLastChanges });
        });
    }
    console.log('Correct answers last changes: ', correctAnswerLastChanges);

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
      newHistory.push({ type: logFields.questionGroupName, changes: questionGroupNameLogs });
    }

    console.log('Question group name last changes: ', questionGroupNameLogs);

    // Question Text
    if (isEnableQuestionText) {
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
            newHistory.push({ type: logFields.questionText, changes: questionTextsLastChanges });
          })
          .catch((e) => console.error(e));
      }

      console.log('question texts last changes: ', questionTextsLastChanges);
    }

    if (isEnablePhoto) {
      // Question photos
      const photosLastChanges = handleLastChanges.photo(eventLogs);

      const photos = photosLastChanges.map((change) => ({
        questionId: change.questionId,
        id: change.photoId,
        url: change.oldValue,
        file: change.newValue,
      }));

      if (photos.length > 0) {
        const photoURLs = await Promise.all(
          photos.map(async (photo) => {
            const uploadPromise = async () => {
              const photoUrl = await uploadPhoto(photo.file);
              dispatch(updateQuestionPhoto({ questionId: photo.questionId, photo: photoUrl }));
              return { questionId: photo.questionId, id: photo.id, url: photoUrl };
            };

            return await toast.promise(uploadPromise(), {
              pending: `${t('uploadingPhotoForQuestion')}${photo.questionId}...`,
              success: `${t('uploadedPhotoForQuestion')}${photo.questionId}!`,
              error: `${t('failedToUploadPhotoForQuestion')}${photo.questionId}`,
            });
          }),
        );

        await toast
          .promise(updatePhotos(photoURLs), {
            pending: t('updatingQuestionPhotos'),
            success: t('updatedQuestionPhotosSuccessfully'),
            error: t('errorUpdatingQuestionPhotos'),
          })
          .then(() => {
            dispatch(removeChangeLogsByField({ field: logFields.photo }));
            // localStorage.removeItem(`questions_${groupId}`);
            newHistory.push({ type: logFields.photo, changes: photosLastChanges });
          });
      }

      console.log('Question photos last changes: ', photosLastChanges);
    }

    if (isEnableAudio) {
      // Audios
      const audiosLastChanges = handleLastChanges.audio(eventLogs);
      const audios = audiosLastChanges.map((change) => ({
        questionId: change.questionId,
        id: change.audioId,
        url: change.oldValue,
        file: change.newValue,
      }));

      if (audios.length > 0) {
        const audioURLs = await Promise.all(
          audios.map(async (audio) => {
            const uploadPromise = async () => {
              const audioUrl = await uploadAudio(audio.file);
              dispatch(updateQuestionAudio({ questionId: audio.questionId, audio: audioUrl }));
              return { questionId: audio.questionId, id: audio.id, url: audioUrl };
            };

            return await toast.promise(uploadPromise(), {
              pending: `${t('uploadingAudioForQuestion')}${audio.questionId}...`,
              success: `${t('uploadedAudioForQuestion')}${audio.questionId}!`,
              error: `${t('failedToUploadAudioForQuestion')}${audio.questionId}`,
            });
          }),
        );

        await toast
          .promise(updateAudios(audioURLs), {
            pending: t('updatingQuestionAudios'),
            success: t('updatedQuestionAudiosSuccessfully'),
            error: t('errorUpdatingQuestionAudios'),
          })
          .then(() => {
            dispatch(removeChangeLogsByField({ field: logFields.audio }));
            // localStorage.removeItem(`questions_${groupId}`);
            newHistory.push({ type: logFields.audio, changes: audiosLastChanges });
          });
      }
      console.log('audio last changes: ', audiosLastChanges);
    }

    const updatedHistory = [...history, ...newHistory];
    setWithExpiry(`editHistory_${groupId}`, updatedHistory);

    if (eventLogs.length === 0) dispatch(toggleEdit({ toggle: false }));
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
        isAddNew={isAddNew}
        isEdit={isEdit}
        isComplete={isComplete}
        onCancel={handleCancel}
        onComplete={handleComplete}
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
      )}

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
