import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import styles from './Template.module.scss';
import Sidebar from '~/components/Compose/Sidebar';
import QuestionGroups from '~/components/Compose/QuestionGroups';
import Questions from '~/components/Compose/Questions';
import Header from '~/components/Compose/Header';
import hooks from '~/hooks';
import {
  isAddNew as adding,
  isEdit as editing,
  changeLog,
  testGroupName,
  toggleAddNew,
  updateQuestionGroupId,
  toggleEdit,
  removeChangeLogsByField,
  updateQuestionGroupName,
  testGroupId,
  updateQuestionPhoto,
  updateQuestionAudio,
  changeQuestions,
  resetChangeLog,
  logFields,
} from '~/redux/features/testSlice';
import {
  addQuestionGroup,
  changeQuestionGroups,
  questionGroupList,
  sortQuestionGroupsByName,
} from '~/redux/features/questionGroupsSilce';
import EnableMediaProvider from '~/context/EnableMediaProvider';
import QuestionsProvider from '~/context/QuestionsProvider';
import handleLastChanges from './handleLastChanges';
import CustomModal from '~/components/CustomModal';
import { getWithExpiry, setWithExpiry } from '~/utils/localStorageUtils';

const cx = classNames.bind(styles);

const Template = ({
  isEnablePhoto = false,
  isEnableAudio = false,
  isEnableQuestionText = false,
  singleAudio = true,
  partName = 'part1_Photos',
  partId = 1,
  quantityOfQuestions,
  quantityOfAnswersPerQuestion,
  quote,
}) => {
  const { t } = useTranslation();
  const eventLogs = useSelector(changeLog);
  const dispatch = useDispatch();
  const groupName = useSelector(testGroupName);
  const groupId = useSelector(testGroupId);
  const isAddNew = useSelector(adding);
  const isEdit = useSelector(editing);
  const questionGroups = useSelector(questionGroupList);
  const [show, setShow] = useState(true);
  const { uploadPhoto, createPhoto } = hooks.usePhotoService();
  const { getQuestionGroups, updatePhotos, updateAudios, updateMany } = hooks.useQuestionService();
  const { uploadAudio, createAudio } = hooks.useAudioService();
  const { updateAnswers } = hooks.useAnswerService();
  const { createTest } = hooks.useTestService();
  const { updateCorrectAnswers, getQuestionsByGroupId } = hooks.useQuestionService();
  const { createQuestionPhoto, createQuestionAudio } = hooks.useQuestionService();
  const { updateQuestionGroup } = hooks.useQuestionGroupService();
  const [showAskCancel, setShowAskCancel] = useState(false);
  const handleUploadMediaFiles = async (questions) => {
    // upload audio and photo file to get their urls
    const mediaURLs = await Promise.all(
      questions.map(async (question, index) => {
        const uploadPromise = async () => {
          const mediaURL = {};

          if (isEnablePhoto) {
            const photoUrl = await uploadPhoto(question.photo);
            mediaURL.photo = photoUrl;
          }

          if (isEnableAudio) {
            const audioUrl = await uploadAudio(question.audio);
            mediaURL.audio = audioUrl;
          }

          return mediaURL;
        };

        return toast.promise(uploadPromise(), {
          pending: `${t('uploadingMediaForQuestion')}${index + 1}...`,
          success: `${t('uploadedMediaForQuestion')}${index + 1}!`,
          error: `${t('failedToUploadMediaForQuestion')}${index + 1}`,
        });
      }),
    );
    return mediaURLs;
  };

  // fetch questions data
  const fetchQuestions = async (groupId) => {
    const questions = await getQuestionsByGroupId(groupId, isEnableAudio, isEnablePhoto);
    return questions;
  };

  const handleCancel = async () => {
    await fetchQuestions(groupId).then((loadedQuestions) => dispatch(changeQuestions({ questions: loadedQuestions })));
    if (isAddNew) {
      dispatch(toggleAddNew({ toggle: false }));
    }

    if (isEdit) {
      dispatch(toggleEdit({ toggle: false }));
    }
    setShowAskCancel(false);

    // if (isEdit) dispatch(toggleEdit({ toggle: false }));
  };

  const handleEdit = async () => {
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
    const questionGroupNameLogs = eventLogs.filter((log) => log.field === logFields.questionGroupName);
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
      dispatch(removeChangeLogsByField({ field: logFields.questionGroupName }));
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

  const handleAddNew = async (questions) => {
    // create url from upload firebase
    const mediaURLs = await handleUploadMediaFiles(questions);

    // create question group, questions
    const newTest = await createTest({
      name: groupName ? groupName : 'New test',
      partId: partId,
      questions: questions.map((question) => {
        const { photo, photoId, audioId, audio, ...questionWithoutMedia } = question;
        return questionWithoutMedia;
      }),
    });

    dispatch(changeQuestions({ questions: newTest.questions }));
    // Create photo, audio for each new question
    await Promise.all(
      newTest.questions.map( async ( question, index ) => {
        // compose photo and audios
        let questionWithMedias = { ...question };
        if (isEnablePhoto) {
          const newPhoto = await createPhoto(mediaURLs[index].photo);
          await createQuestionPhoto(question.id, newPhoto.id);
          questionWithMedias.photo = newPhoto.filePath;
          dispatch(updateQuestionPhoto({ questionId: question.id, photo: newPhoto.filePath }));
        }
        if (isEnableAudio) {
          const newAudio = await createAudio(mediaURLs[index].audio);
          await createQuestionAudio(question.id, newAudio.id);
          questionWithMedias.audio = newAudio.audioLink;
          dispatch(updateQuestionAudio({ questionId: question.id, audio: newAudio.audioLink }));
        }
        return questionWithMedias;
      }),
    )
      .then(() => {
        dispatch(addQuestionGroup({ questionGroup: newTest.questionGroup }));
        dispatch(toggleAddNew({ toggle: false }));
        dispatch(updateQuestionGroupId({ groupId: newTest.questionGroup.id }));
        dispatch(resetChangeLog());
      })
      .catch((e) => console.error(e));
  };

  const handleComplete = async (questions) => {
    if (isAddNew) handleAddNew(questions);
    if (isEdit) handleEdit();
  };

  useEffect(() => {
    if (eventLogs.length === 0) {
      dispatch(toggleEdit({ toggle: false }));
      dispatch(sortQuestionGroupsByName());
    }

    // eslint-disable-next-line
  }, [eventLogs]);

  // fetch question groups data
  const fetchQuestionGroups = async (partId) => {
    const groups = await getQuestionGroups(partId);
    dispatch(changeQuestionGroups({ questionGroups: groups }));
  };

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
    if (isAddNew) dispatch(updateQuestionGroupName({ name: `Test ${questionGroups.length + 1}` }));
    else dispatch(removeChangeLogsByField({ field: 'questionGroupName' }));
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
      <EnableMediaProvider isEnablePhoto={isEnablePhoto} isEnableAudio={isEnableAudio}>
        <div className={cx('main', { scaled: show })}>
          {/* Header */}
          <Header title={partName} show={show} setShow={setShow} />
          {/* Questions */}
          <QuestionsProvider isEnableQuestionText={isEnableQuestionText}>
            <Questions
              quote={quote}
              onComplete={handleComplete}
              quantityOfQuestions={quantityOfQuestions}
              quantityOfAnswersPerQuestion={quantityOfAnswersPerQuestion}
            />
          </QuestionsProvider>
        </div>
        {/* Sidebar: Group question */}
        <Sidebar title={partName} show={show}>
          <Fragment>
            <QuestionGroups />
          </Fragment>
        </Sidebar>
      </EnableMediaProvider>
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
