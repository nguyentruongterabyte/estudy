import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import styles from './Photos.module.scss';
import { ToastContainer, toast } from 'react-toastify';

import Sidebar from './Sidebar';
import QuestionGroups from './QuestionGroups';
import Questions from './Questions';
import Header from './Header';
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
} from '~/redux/features/testSlice';
import {
  addQuestionGroup,
  changeQuestionGroups,
  questionGroupList,
  sortQuestionGroupsByName,
} from '~/redux/features/questionGroupsSilce';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

const Photos = () => {
  const { t } = useTranslation();
  const eventLogs = useSelector(changeLog);
  const dispatch = useDispatch();
  const groupName = useSelector(testGroupName);
  const groupId = useSelector(testGroupId);
  const isAddNew = useSelector(adding);
  const isEdit = useSelector(editing);
  const questionGroups = useSelector(questionGroupList);
  const [show, setShow] = useState(true);
  const { uploadPhoto } = hooks.usePhotoService();
  const { getQuestionGroups, updatePhotos } = hooks.useQuestionService();
  const { uploadAudio, createAudio } = hooks.useAudioService();
  const { updateAnswers } = hooks.useAnswerService();
  const { createTest } = hooks.useTestService();
  const { updateCorrectAnswers } = hooks.useQuestionService();
  const { createQuestionPhoto, createQuestionAudio } = hooks.useQuestionService();
  const { updateQuestionGroup } = hooks.useQuestionGroupService();

  const handleUploadMediaFiles = async (questions) => {
    // upload audio and photo file to get their urls
    const mediaURLs = await Promise.all(
      questions.map(async (question, index) => {
        const uploadPromise = async () => {
          const photoUrl = await uploadPhoto(question.photo);
          const audioUrl = await uploadAudio(question.audio);
          return { photo: photoUrl, audio: audioUrl };
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

  const handleEdit = async () => {
    // Handle update Answers
    let lastChanges = Object.values(
      eventLogs
        .filter((log) => log.field === 'answer')
        .reduce((acc, log) => {
          const key = `${log.questionId}-${log.answerId}`;

          if (!acc[key]) acc[key] = [];
          acc[key].push(log);
          return acc;
        }, {}),
    )
      .map((group) => {
        const firstChange = group[0];
        const lastChange = group[group.length - 1];

        return firstChange.oldValue !== lastChange.newValue ? lastChange : null;
      })
      .filter((change) => change !== null);

    const answers = lastChanges.map((change) => ({
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
          dispatch(removeChangeLogsByField({ field: 'answer' }));
        });
    }
    console.log('Answers last changes: ', lastChanges);

    // correctAnswers
    lastChanges = Object.values(
      eventLogs
        .filter((log) => log.field === 'correctAnswer')
        .reduce((acc, log) => {
          const key = log.questionId;
          if (!acc[key]) acc[key] = [];
          acc[key].push(log);
          return acc;
        }, {}),
    )
      .map((group) => {
        const firstChange = group[0];
        const lastChange = group[group.length - 1];

        return firstChange.oldValue !== lastChange.newValue ? lastChange : null;
      })
      .filter((change) => change !== null);

    const correctAnswers = lastChanges.map((change) => ({
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
          dispatch(removeChangeLogsByField({ field: 'correctAnswer' }));
        });
    }
    console.log('Correct answers last changes: ', lastChanges);

    // Question Group Name
    const questionGroupNameLogs = eventLogs.filter((log) => log.field === 'questionGroupName');
    if (questionGroupNameLogs.length > 0) {
      const firstChange = questionGroupNameLogs[0];
      const lastChange = questionGroupNameLogs[questionGroupNameLogs.length - 1];

      lastChanges = firstChange.oldValue === lastChange.newValue ? null : lastChange;
      if (lastChanges !== null) {
        // handle change name
        await toast
          .promise(updateQuestionGroup({ id: groupId, name: lastChanges.newValue }), {
            pending: t('updatingQuestionGroupName'),
            success: t('updatedQuestionGroupNameSuccessfully'),
            error: t('errorUpdatingQuestionGroupName'),
          })
          .then(() => {
            dispatch(removeChangeLogsByField({ field: 'questionGroupName' }));
          });
      } else {
        dispatch(removeChangeLogsByField({ field: 'questionGroupName' }));
      }
    }

    console.log('Question group name last changes: ', lastChanges);

    // Question photos
    lastChanges = Object.values(
      eventLogs
        .filter((log) => log.field === 'photo')
        .reduce((acc, log) => {
          const key = log.questionId;
          if (!acc[key]) acc[key] = [];
          acc[key].push(log);
          return acc;
        }, {}),
    )
      .map((group) => {
        const firstChange = group[0];
        const lastChange = group[group.length - 1];

        return firstChange.oldValue !== lastChange.newValue ? { ...lastChange, oldValue: firstChange.oldValue } : null;
      })
      .filter((change) => change !== null);

    const photos = lastChanges.map((change) => ({
      questionId: change.questionId,
      url: change.oldValue,
      file: change.newValue,
    }));

    if (photos.length > 0) {
      const photoURLs = await Promise.all(
        photos.map(async (photo) => {
          const uploadPromise = async () => {
            const photoUrl = await uploadPhoto(photo.file);
            dispatch(updateQuestionPhoto({ questionId: photo.questionId, photo: photoUrl }));
            return { questionId: photo.questionId, url: photoUrl };
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
          dispatch(removeChangeLogsByField({ field: 'photo' }));
          // localStorage.removeItem(`questions_${groupId}`);
        });
    }

    console.log('Question photos last changes: ', lastChanges);

    // Audios
    lastChanges = Object.values(
      eventLogs
        .filter((log) => log.field === 'audio')
        .reduce((acc, log) => {
          const key = log.questionId;
          if (!acc[key]) acc[key] = [];
          acc[key].push(log);
          return acc;
        }, {}),
    )
      .map((group) => {
        const firstChange = group[0];
        const lastChange = group[group.length - 1];

        return firstChange.oldValue !== lastChange.newValue ? { ...lastChange, oldValue: firstChange.oldValue } : null;
      })
      .filter((change) => change !== null);
    const audios = lastChanges.map((change) => ({
      questionId: change.questionId,
      url: change.oldValue,
      file: change.newValue,
    }));

    if (audios.length > 0) {
      const audioURLs = await Promise.all(
        audios.map(async (audio) => {
          const uploadPromise = async () => {
            const audioUrl = await uploadPhoto(audio.file);
            dispatch(updateQuestionAudio({ questionId: audio.questionId, audio: audioUrl }));
            return { questionId: audio.questionId, url: audioUrl };
          };

          return await toast.promise(uploadPromise(), {
            pending: `${t('uploadingAudioForQuestion')}${audio.questionId}...`,
            success: `${t('uploadedAudioForQuestion')}${audio.questionId}!`,
            error: `${t('failedToUploadAudioForQuestion')}${audio.questionId}`,
          });
        }),
      );

      await toast
        .promise(updatePhotos(audioURLs), {
          pending: t('updatingQuestionAudios'),
          success: t('updatedQuestionAudiosSuccessfully'),
          error: t('errorUpdatingQuestionAudios'),
        })
        .then(() => {
          dispatch(removeChangeLogsByField({ field: 'audio' }));
          // localStorage.removeItem(`questions_${groupId}`);
        });
    }
    console.log('audio last changes: ', lastChanges);

    if (eventLogs.length === 0) dispatch(toggleEdit({ toggle: false }));
  };

  const handleAddNew = async (questions) => {
    const mediaURLs = await handleUploadMediaFiles(questions);

    // create question group, questions
    const newTest = await createTest({
      name: groupName ? groupName : 'New test',
      partId: 1,
      questions,
    });

    const { questionGroup, questions: newQuestions } = newTest;

    // Create photo, audio for each new question
    await Promise.all(
      newQuestions.map(async (question, index) => {
        const newPhoto = await createQuestionPhoto(question.id, mediaURLs[index].photo);
        const newAudio = await createAudio(mediaURLs[index].audio);

        await createQuestionAudio(question.id, newAudio.id);

        return { ...question, photo: newPhoto.filePath, audio: newAudio.audioLink };
      }),
    )
      .then(() => {
        dispatch(addQuestionGroup({ questionGroup: questionGroup }));
        dispatch(toggleAddNew({ toggle: false }));
        dispatch(updateQuestionGroupId({ groupId: questionGroup.id }));
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
    fetchQuestionGroups(1);
    if (questionGroups.length > 0) {
      dispatch(updateQuestionGroupId({ groupId: questionGroups[0].id }));
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isAddNew) dispatch(updateQuestionGroupName({ name: `Test ${questionGroups.length + 1}` }));
    else dispatch(removeChangeLogsByField({ field: 'questionGroupName' }));
    // eslint-disable-next-line
  }, [isAddNew]);

  return (
    <div className={cx('container')}>
      <div className={cx('main', { scaled: show })}>
        {/* Header */}
        <Header title="part1_Photos" show={show} setShow={setShow} />
        {/* Questions */}
        <Questions onComplete={handleComplete} />
      </div>
      {/* Sidebar: Group question */}
      <Sidebar title="part1_Photos" show={show}>
        <Fragment>
          <QuestionGroups partId={1} />
        </Fragment>
      </Sidebar>
      <ToastContainer />
    </div>
  );
};

export default Photos;
