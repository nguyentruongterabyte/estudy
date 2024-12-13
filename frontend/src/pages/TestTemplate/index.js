import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';
import QuestionGroups from '~/components/QuestionGroups';
import hooks from '~/hooks';
import ContentManager from '../../components/ContentManager';
import {
  isComplete as finished,
  changeLog,
  changeQuestions,
  questionList,
  updateQuestionPhoto,
  updateQuestionAudio,
  resetChangeLog,
  removeChangeLogsByField,
} from '~/redux/features/questionsSingleSlice';
import {
  finished as bundleFinished,
  changeLog as bundleChangeLog,
  resetChangeLog as resetBundleChangeLog,
  changeBundles,
  updatePhoto,
  updateAudio,
  removeChangeLogsByField as questionBundleRemoveChangeLogsByField,
} from '~/redux/features/questionBundlesSlice';

import {
  activeGroup,
  addQuestionGroup,
  adding,
  changeQuestionGroups,
  deleteQuestionGroup,
  editing,
  setActive,
  sortQuestionGroupsByName,
  toggleAddNew,
  toggleEdit,
  changeLog as groupChangeLog,
  removeChangeLogsByField as questionGroupRemoveChangeLogsByField,
} from '~/redux/features/questionGroupsSilce';

import { questionBundles } from '~/redux/features/questionBundlesSlice';
import Loading from '~/components/Loading';
import BundleCards from '~/components/BundleCards';
import QuestionSingle from '~/components/QuestionSingle';
import QuestionBundles from '~/components/QuestionBundles';
import { getWithExpiry, setWithExpiry } from '~/utils/localStorageUtils';
import handleLastChanges from '~/components/QuestionSingle/handleLastChanges';
import logFields from '~/redux/logFields';
import QuestionGroupProvider from '~/context/QuestionGroupProvider';
import Timer from '~/components/Timer';
import styles from './TestTemplate.module.scss';
import QuestionsCard from '~/components/QuestionsCard';
import { groups } from '~/redux/features/userAnswersSlice';
import { Button } from 'react-bootstrap';
import ShufflingProvider from '~/context/ShufflingProvider';
import shuffleArray from '~/utils/shuffleArray';

const cx = classNames.bind(styles);

const TestTemplate = ({
  isEnableExplainText,
  isEnablePhoto = false,
  isEnableAudio = false,
  isEnableQuestionText = false,
  isEnableBottombar = false,
  isEnableChooseNumberOfQuestion,

  isUser,
  isTextHiddenDuringPractice = false,
  isDisplayAnswerText = true,
  isDisplayQuestionText = true,
  isShufflingAnswersEnabled = false,
  isShufflingQuestionsEnabled = false,
  isShufflingBundlesEnabled = false,

  questionBundle = false,
  partName = 'part1_Photos',
  partId = 1,
  quantityOfQuestions,
  quantityOfAnswersPerQuestion,
  quantityOfBundles,
  quantityOfQuestionsPerBundle,
  quote = 'quote1',
}) => {
  const { uploadPhoto, createPhoto, updatePhotos, deletePhoto } = hooks.usePhotoService();
  const { uploadAudio, createAudio, updateAudios } = hooks.useAudioService();
  const { createTest, createBundleTest, deleteTest, deleteBundleTest } = hooks.useTestService();
  const {
    createQuestionPhoto,
    createQuestionAudio,
    updateCorrectAnswers,
    updateMany,
    getQuestionGroups,
    getQuestionsByGroupId,
  } = hooks.useQuestionService();
  const { createBundleAudio, createBundlePhoto, updateManyBundles, getQuestionBundlesByGroupId } =
    hooks.useQuestionBundleService();
  const { updateAnswers } = hooks.useAnswerService();
  const { updateQuestionGroup } = hooks.useQuestionGroupService();

  const { t } = useTranslation();
  const singleEventLogs = useSelector(changeLog);
  const bundleEventLogs = useSelector(bundleChangeLog);

  const dispatch = useDispatch();
  const isAddNew = useSelector(adding);
  const isEdit = useSelector(editing);

  const questionGroupEventLogs = useSelector(groupChangeLog);
  const isSingleComplete = useSelector(finished);
  const isBunldeComplete = useSelector(bundleFinished);
  const isComplete = isSingleComplete || isBunldeComplete;
  const active = useSelector(activeGroup);
  const groupName = active.name;
  const [groupId, setGroupId] = useState(active.id);
  const questions = useSelector(questionList);
  const bundles = useSelector(questionBundles);
  const [showAskCancel, setShowAskCancel] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isQuestionsLoading, setIsQuestionsLoading] = useState(false);
  const [isQuestionGroupsLoading, setIsQuestionGroupsLoading] = useState(false);
  const newQuestionGroup = hooks.useNewQuestionGroup();
  const { updateManyByQuestionId } = hooks.useCorrectAnswerService();
  const [newHistory, setNewHistory] = useState([]);
  const { saveItem: saveNewItem, removeItem: removeNewItem } = hooks.useSaveData('new_test');
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

  // handle start practice
  const handleStartPractice = () => {
    setShowTimer(true);
  };

  // handle continue test
  const handleContinueTest = () => {
    const timer = getTimer(groupId);
    setInitialTimer(timer);
    setShowTimer(true);
  };

  const handleReviewTest = () => {
    setAlwaysOpen(true);
  };

  // save timer
  const handleTimerChange = (secondsElapsed) => {
    if (secondsElapsed !== 0 && isPractice) {
      saveTimer(groupId, secondsElapsed);
    }
  };

  // fetch questions data
  const fetchQuestions = async (groupId) => {
    const questions = await getQuestionsByGroupId(groupId, isEnableAudio, isEnablePhoto);
    return questions;
  };

  // fetch question bundles data
  const fetchQuestionBundles = async (groupId) => {
    const questionBundles = await getQuestionBundlesByGroupId(groupId, isEnableAudio, isEnablePhoto);
    return questionBundles;
  };

  const handleLoading = async () => {
    let currentOrder = 1;
    if (questionBundle) {
      fetchQuestionBundles(groupId).then((loadedQuestionBundles) => {
        const shuffledBundles =
          isUser && isShufflingBundlesEnabled ? shuffleArray(loadedQuestionBundles) : loadedQuestionBundles;
        dispatch(
          changeBundles({
            // shuffled bundles
            bundles: shuffledBundles.map((bundle, index) => ({
              ...bundle,
              active: index === 0 ? true : false,
              isEnablePhoto: bundle.photo ? true : false,
              questions:
                isUser && isShufflingQuestionsEnabled
                  ? // shuffled questions
                    shuffleArray(bundle.questions).map((question) => ({
                      ...question,
                      order: currentOrder++,
                      answers:
                        isUser && isShufflingAnswersEnabled
                          ? // shuffled answers
                            shuffleArray(question.answers).map((answer, index) => ({
                              ...answer,
                              index,
                            }))
                          : question.answers.map((answer, index) => ({
                              ...answer,
                              index,
                            })),
                    }))
                  : bundle.questions.map((question) => ({
                      ...question,
                      order: currentOrder++,
                      answers:
                        isUser && isShufflingAnswersEnabled
                          ? // shuffle answers
                            shuffleArray(question.answers).map((answer, index) => ({
                              ...answer,
                              index,
                            }))
                          : question.answers.map((answer, index) => ({
                              ...answer,
                              index,
                            })),
                    })),
            })),
          }),
        );
      });
    } else {
      setIsQuestionsLoading(true);
      fetchQuestions(groupId)
        .then((loadedQuestions) => {
          const shuffledQuestions =
            // shuffle questions
            isUser && isShufflingQuestionsEnabled ? shuffleArray(loadedQuestions) : loadedQuestions;
          dispatch(
            changeQuestions({
              questions: shuffledQuestions.map((question) => ({
                ...question,
                answers:
                  isUser && isShufflingAnswersEnabled
                    ? // shuffle answers
                      shuffleArray(question.answers).map((answer, index) => ({ ...answer, index }))
                    : question.answers.map((answer, index) => ({ ...answer, index })),
              })),
            }),
          );
          setIsQuestionsLoading(false);
        })
        .catch((e) => console.error(e))
        .finally(() => setIsQuestionsLoading(false));
    }
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
    handleLoading();
    removeNewItem(partId);
  };

  // handle delete question group
  const handleDeleteQuestionGroup = async () => {
    if (questionBundle) {
      await toast
        .promise(deleteBundleTest(groupId), {
          pending: t('deletingQuestionGroup'),
          success: t('deletedQuestionGroupSuccessfully'),
          error: t('failedToDeleteQuestionGroup'),
        })
        .then(() => {
          dispatch(deleteQuestionGroup({ groupId }));
        });

      setShowDeleteModal(false);

      dispatch(changeBundles({ bundles: [] }));
    } else {
      await toast
        .promise(deleteTest(groupId), {
          pending: t('deletingQuestionGroup'),
          success: t('deletedQuestionGroupSuccessfully'),
          error: t('failedToDeleteQuestionGroup'),
        })
        .then(() => {
          dispatch(deleteQuestionGroup({ groupId }));
        });

      setShowDeleteModal(false);

      dispatch(changeQuestions({ questions: [] }));
    }
  };

  // handle cancel edit/add
  const handleCancel = async () => {
    handleLoading();
    if (isAddNew) {
      dispatch(toggleAddNew({ toggle: false }));
      dispatch(deleteQuestionGroup({ groupId: newQuestionGroup.id }));
      removeNewItem(partId);
    }

    if (isEdit) {
      dispatch(toggleEdit({ toggle: false }));
    }
    setShowAskCancel(false);
  };

  // handle complete
  const handleComplete = () => {
    if (bundleChangeLog.length === 0 || singleEventLogs.length === 0) dispatch(toggleEdit({ toggle: false }));

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
        };
        const newTest = await createTest(questionsData);
        return newTest;
      case 'bundle':
        // create question group, bundles, questions
        let bundlesData = {
          name: groupName ? groupName : 'New test',
          partId: partId,
          bundles: bundles.map((bundle) => ({
            text: bundle.text,
            questions: bundle.questions.map((question) => ({
              question: question.question,
              correctAnswerIndex: question.correctAnswerIndex,
              answers: question.answers.map((answer) => ({
                answer: answer.answer,
              })),
            })),
          })),
        };

        // async function save bundle test ...
        const newBundleTest = await createBundleTest(bundlesData);
        return newBundleTest;
      default:
        throw new Error('Test type not found');
    }
  };

  // handle edit
  const handleEdit = async () => {
    const history = getWithExpiry(`editHistory_${groupId}`) || [];

    const eventLogs = questionBundle ? bundleEventLogs : singleEventLogs;

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
          dispatch(questionBundleRemoveChangeLogsByField({ field: logFields.answer }));
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
          dispatch(questionBundleRemoveChangeLogsByField({ field: logFields.correctAnswer }));
          setNewHistory((prev) => [...prev, { type: logFields.correctAnswer, changes: correctAnswerLastChanges }]);
        });
    }
    console.log('Correct answers last changes: ', correctAnswerLastChanges);

    // Explain Text
    if (isEnableExplainText) {
      const explainTextLastChanges = handleLastChanges.explaionText(eventLogs);
      const correctAnswers = explainTextLastChanges.map((change) => ({
        questionId: change.questionId,
        explain: change.newValue,
      }));

      if (correctAnswers.length > 0) {
        await toast
          .promise(updateManyByQuestionId(correctAnswers), {
            pending: t('updatingExplanation'),
            success: t('updatedExplanationSuccessfully'),
            error: t('errorUpdatingExplanation'),
          })
          .then(() => {
            dispatch(removeChangeLogsByField({ field: logFields.explainText }));
            dispatch(questionBundleRemoveChangeLogsByField({ field: logFields.explainText }));
            setNewHistory((prev) => [...prev, { type: logFields.explainText, changes: explainTextLastChanges }]);
          })
          .catch((e) => console.error(e));
      }
    }

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
            dispatch(questionBundleRemoveChangeLogsByField({ field: logFields.questionText }));
            setNewHistory((prev) => [...prev, { type: logFields.questionText, changes: questionTextsLastChanges }]);
          })
          .catch((e) => console.error(e));
      }

      console.log('question texts last changes: ', questionTextsLastChanges);
    }
    if (questionBundle) {
      await handleQuestionBundleEdit(eventLogs);
    } else {
      await handleQuestionSingleEdit(eventLogs);
    }

    const updatedHistory = [...history, ...newHistory];
    console.log(updatedHistory);
    setWithExpiry(`editHistory_${groupId}`, updatedHistory);
  };

  // handle question bundle add new
  const handleQuestionBundleAddNew = async () => {
    // create url from upload firebase
    let photoFiles = [];
    let audioFiles = [];
    let filePaths = [];
    let audioLinks = [];

    if (isEnablePhoto) {
      bundles.forEach((bundle) => {
        if (bundle.isEnablePhoto) photoFiles.push(bundle.photo);
      });

      filePaths = await toast.promise(uploadMediaFiles(photoFiles, 'photo'), {
        pending: t('uploadingMediaForQuestion'),
        success: t('uploadedMediaForQuestion'),
        error: t('failedToUploadMediaForQuestion'),
      });
    }

    if (isEnableAudio) {
      bundles.forEach((bundle) => audioFiles.push(bundle.audio));
      audioLinks = await toast.promise(uploadMediaFiles(audioFiles, 'audio'), {
        pending: t('uploadingMediaForQuestion'),
        success: t('uploadedMediaForQuestion'),
        error: t('failedToUploadMediaForQuestion'),
      });
    }

    // create question group, question bundles
    const newTest = await handleCreateTest('bundle');
    const newQuestionBundles = newTest.questionBundles;
    const oldQuestionBundles = bundles;
    dispatch(changeBundles({ bundles: newQuestionBundles }));

    // create photo, audio for each new bundle
    let i = 0;
    await Promise.all(
      newQuestionBundles.map(async (bundle, index) => {
        let bundleWithMedias = { ...bundle };
        if (isEnablePhoto && oldQuestionBundles[index].isEnablePhoto) {
          const newPhoto = await createPhoto(filePaths[i]);
          i = i + 1;
          await createBundlePhoto(bundle.id, newPhoto.id);
          bundleWithMedias.photo = newPhoto.filePath;
          dispatch(updatePhoto({ id: bundle.id, photo: newPhoto.filePath }));
        }

        if (isEnableAudio) {
          const newAudio = await createAudio(audioLinks[index]);
          await createBundleAudio(bundle.id, newAudio.id);
          bundleWithMedias.audio = newAudio.audioLink;
          dispatch(updateAudio({ id: bundle.id, audio: newAudio.audioLink }));
        }

        return bundleWithMedias;
      }),
    )
      .then(() => {
        dispatch(addQuestionGroup({ id: newTest.questionGroup.id, name: newTest.questionGroup.name }));
        dispatch(deleteQuestionGroup({ groupId: newQuestionGroup.id }));
        dispatch(toggleAddNew({ toggle: false }));
        dispatch(setActive({ id: newTest.questionGroup.id, name: newTest.questionGroup.name }));
        dispatch(resetBundleChangeLog());
      })
      .catch((e) => console.error(e));
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
    const newTest = await handleCreateTest('single');

    const newQuestions = newTest.questions;
    dispatch(changeQuestions({ questions: newQuestions }));

    // Create photo, audio for each new question
    await Promise.all(
      newQuestions.map(async (question, index) => {
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
  const handleQuestionBundleEdit = async (eventLogs) => {
    const bundleTextsLastChanges = handleLastChanges.bundleText(eventLogs);
    const questionBundles = bundleTextsLastChanges.map((change) => ({
      id: change.id,
      text: change.newValue,
    }));

    if (questionBundles.length > 0) {
      await toast
        .promise(updateManyBundles(questionBundles), {
          pending: t('changingQuestions'),
          success: t('changeQuestionsSuccess'),
          error: t('changeQuestionsError'),
        })
        .then(() => {
          dispatch(questionBundleRemoveChangeLogsByField({ field: logFields.bundleText }));
          setNewHistory((prev) => [...prev, { type: logFields.bundleText, changes: bundleTextsLastChanges }]);
        })
        .catch((e) => console.error(e));
    }

    console.log('bundle texts last changes: ', bundleTextsLastChanges);

    if (isEnablePhoto) {
      // Bundle photos
      const photosLastChanges = handleLastChanges.photo(eventLogs);

      console.log('photosLastChanges', photosLastChanges);

      // upload file and change filepath of photo
      const photos = photosLastChanges
        // .filter((change) => change.isEnablePhoto)
        .map((change) => ({
          bundleId: change.id,
          id: change.photoId,
          url: change.oldValue,
          file: change.newValue,
        }));

      console.log('Photos: ', photos);

      // has changed
      if (photos.length > 0) {
        const photoURLs = await Promise.all(
          photos.map(async (photo) => {
            const uploadPromise = async () => {
              const photoUrl = await uploadPhoto(photo.file);
              let p = { ...photo };
              // create new photo if not exist
              if (!photo.id) {
                const newPhoto = await createPhoto(photoUrl);
                await createBundlePhoto(photo.bundleId, newPhoto.id);
                p.id = newPhoto.id;
              }

              dispatch(updatePhoto({ id: photo.bundleId, photo: photoUrl }));
              return { id: p.id, url: photoUrl };
            };

            return await toast.promise(uploadPromise(), {
              pending: `${t('uploadingPhotoForQuestion')}...`,
              success: `${t('uploadedPhotoForQuestion')}!`,
              error: `${t('failedToUploadPhotoForQuestion')}`,
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
            dispatch(questionBundleRemoveChangeLogsByField({ field: logFields.photo }));
            // localStorage.removeItem(`questions_${groupId}`);
            setNewHistory((prev) => [...prev, { type: logFields.photo, changes: photosLastChanges }]);
          });
        console.log('Question photos last changes: ', photosLastChanges);
      }

      // remove photoDB when bundle has photo but disabled
      await Promise.all(
        bundles.map(async (bundle) => {
          if (!bundle.isEnablePhoto && bundle.photo) {
            await deletePhoto(bundle.photoId);
          }
        }),
      );
    }

    if (isEnableAudio) {
      // Audios
      const audiosLastChanges = handleLastChanges.audio(eventLogs);
      const audios = audiosLastChanges.map((change) => ({
        bundleId: change.id,
        id: change.audioId,
        url: change.oldValue,
        file: change.newValue,
      }));

      if (audios.length > 0) {
        const audioURLs = await Promise.all(
          audios.map(async (audio) => {
            const uploadPromise = async () => {
              const audioUrl = await uploadAudio(audio.file);
              dispatch(updateAudio({ id: audio.bundleId, audio: audioUrl }));
              return { bundleId: audio.bundleId, id: audio.id, url: audioUrl };
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
            dispatch(questionBundleRemoveChangeLogsByField({ field: logFields.audio }));
            // localStorage.removeItem(`questions_${groupId}`);
            setNewHistory((prev) => [...prev, { type: logFields.audio, changes: audiosLastChanges }]);
          });
      }
      console.log('audio last changes: ', audiosLastChanges);
    }

    if (eventLogs.length === 0) dispatch(toggleEdit({ toggle: false }));
  };

  // handle edit question single
  const handleQuestionSingleEdit = async (eventLogs) => {
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
              pending: `${t('uploadingPhotoForQuestion')}...`,
              success: `${t('uploadedPhotoForQuestion')}!`,
              error: `${t('failedToUploadPhotoForQuestion')}`,
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
            setNewHistory((prev) => [...prev, { type: logFields.photo, changes: photosLastChanges }]);
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
            setNewHistory((prev) => [...prev, { type: logFields.audio, changes: audiosLastChanges }]);
          });
      }
      console.log('audio last changes: ', audiosLastChanges);
    }

    if (eventLogs.length === 0) dispatch(toggleEdit({ toggle: false }));
  };

  useEffect(() => {
    if (groupId && !isAddNew) {
      handleLoading();
    }
    // eslint-disable-next-line
  }, [groupId, isAddNew]);

  useEffect(() => {
    // toggle edit to false when event logs are empty
    if (singleEventLogs.length === 0) {
      dispatch(toggleEdit({ toggle: false }));
      dispatch(sortQuestionGroupsByName());
    }

    // eslint-disable-next-line
  }, [singleEventLogs]);

  useEffect(() => {
    // toggle edit to false when event logs are empty
    if (bundleEventLogs.length === 0) {
      dispatch(toggleEdit({ toggle: false }));
      dispatch(sortQuestionGroupsByName());
    }

    // eslint-disable-next-line
  }, [bundleEventLogs]);

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
    setGroupId(active.id);
    setIsPractice(false);
    setShowTimer(false);
    setInitialTimer(0);
  }, [active]);

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
    const getFileAsBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result); // Trả về chuỗi Base64 khi đọc xong
        };
        reader.onerror = (error) => {
          reject(error); // Báo lỗi nếu có vấn đề trong quá trình đọc file
        };
        reader.readAsDataURL(file);
      });
    };
    const processItems = async (items) => {
      return Promise.all(
        items.map(async (item) => {
          const itemBase64 = { ...item };

          if (item.photo instanceof File) {
            const photoBase64 = await getFileAsBase64(item.photo);
            itemBase64.photo = photoBase64;
          }

          if (item.audio instanceof File) {
            const audioBase64 = await getFileAsBase64(item.audio);
            itemBase64.audio = audioBase64;
          }

          return itemBase64;
        }),
      );
    };
    const processSaveData = async () => {
      if (isAddNew) {
        if (questionBundle) {
          const saveBundles = await processItems(bundles);
          saveNewItem(partId, { bundles: saveBundles });
        } else {
          const saveQuestions = await processItems(questions);
          saveNewItem(partId, { questions: saveQuestions });
        }
      }
    };

    processSaveData(); // Chạy hàm xử lý bất đồng bộ
    // eslint-disable-next-line
  }, [isAddNew, bundles, questions]);

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
      isUser={isUser}
      isDisplayAnswerText={isDisplayAnswerText}
      isDisplayQuestionText={isDisplayQuestionText}
      isEdit={isEdit}
      isAddNew={isAddNew}
      isComplete={isComplete}
      headerTitle={partName}
      onHeaderCancel={handleCancel}
      onHeaderComplete={handleComplete}
      sidebarTitle={partName}
      sidebarChildren={
        <Fragment>
          {isQuestionGroupsLoading ? (
            <Loading />
          ) : (
            <QuestionGroupProvider
              onDelete={(groupId) => {
                setShowDeleteModal(true);
                setGroupId(groupId);
              }}
            >
              <QuestionGroups onComplete={handleComplete} isComplete={isComplete} onCancel={handleCancelAddNew} />
            </QuestionGroupProvider>
          )}
        </Fragment>
      }
      mainChildren={
        <div className={cx('main')}>
          <ShufflingProvider
            isShufflingAnswersEnabled={isShufflingAnswersEnabled}
            isShufflingQuestionsEnabled={isShufflingQuestionsEnabled}
            isShufflingBundlesEnabled={isShufflingBundlesEnabled}
          >
            {showTimer ? (
              <Timer className={cx('timer')} onTimerChange={handleTimerChange} initialSeconds={initialTimer} />
            ) : (
              isPractice && (
                <Button size="lg" className={cx('show-result-btn')} onClick={() => setIsPractice(false)}>
                  {t('showResult')}
                </Button>
              )
            )}
            {questionBundle ? (
              <QuestionBundles
                activeQuestionIndex={activeQuestionIndex}
                alwaysOpen={alwaysOpen}
                isPractice={isPractice}
                setIsPractice={setIsPractice}
                onReviewTest={handleReviewTest}
                onContinueTest={handleContinueTest}
                onStartPractice={handleStartPractice}
                partId={partId}
                data={bundles}
                isTextHiddenDuringPractice={isTextHiddenDuringPractice}
                isEnableExplainText={isEnableExplainText}
                isEnableChooseNumberOfQuestion={isEnableChooseNumberOfQuestion}
                isEnableAudio={isEnableAudio}
                isEnablePhoto={isEnablePhoto}
                quantityOfBundles={quantityOfBundles}
                quantityOfQuestionsPerBundle={quantityOfQuestionsPerBundle}
                quantityOfAnswersPerQuestion={quantityOfAnswersPerQuestion}
                quote={quote}
              />
            ) : (
              <QuestionSingle
                activeQuestionIndex={activeQuestionIndex}
                alwaysOpen={alwaysOpen}
                isPractice={isPractice}
                setIsPractice={setIsPractice}
                onReviewTest={handleReviewTest}
                onContinueTest={handleContinueTest}
                onStartPractice={handleStartPractice}
                isEnableExplainText={isEnableExplainText}
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
          </ShufflingProvider>
        </div>
      }
      isEnableBottombar={isEnableBottombar && (questions.length > 0 || bundles.length > 0)}
      bottombarChildren={
        questionBundle ? (
          <BundleCards onActiveQuestion={handleActiveQuestion} data={bundles} />
        ) : (
          <QuestionsCard onActiveQuestion={handleActiveQuestion} />
        )
      }
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
          show: showDeleteModal,
          setShow: setShowDeleteModal,
          handleAgreeButtonClick: handleDeleteQuestionGroup,
        },
      ]}
    />
  );
};

export default TestTemplate;
