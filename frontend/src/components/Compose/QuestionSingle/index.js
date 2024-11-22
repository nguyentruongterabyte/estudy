import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import styles from './QuestionSingle.module.scss';
import QuestionsProvider from '~/context/QuestionsProvider';
import {
  isComplete as finished,
  changeCorrectAnswerIndex,
  changeLog,
  updateAnswer,
  updateQuestionAudio,
  updateQuestionPhoto,
  updateQuestionText,
  changeQuestions,
  resetChangeLog,
  removeChangeLogsByField,
  logFields,
  toggleComplete,
} from '~/redux/features/testSlice';
import AnswerChangeProvider from '~/context/AnswerChangeProvider';
import Loading from '~/components/Loading';
import Questions from '../Questions';
import hooks from '~/hooks';
import { getWithExpiry, setWithExpiry } from '~/utils/localStorageUtils';
import handleLastChanges from './handleLastChanges';
import { useTranslation } from 'react-i18next';
import {
  activeGroup,
  adding,
  deleteQuestionGroup,
  editing,
  setActive,
  toggleAddNew,
  toggleEdit,
} from '~/redux/features/questionGroupsSilce';

const cx = classNames.bind(styles);

const fn = () => {};

const QuestionSingle = ({
  isEnableQuestionText,
  isQuestionsLoading,
  questions,
  quote,
  quantityOfQuestions,
  quantityOfAnswersPerQuestion,
  isEnableAudio,
  isEnablePhoto,
  partId,
  onAddNewSuccess = fn,
}) => {
  const { t } = useTranslation();

  const { uploadPhoto, createPhoto, updatePhotos } = hooks.usePhotoService();
  const { uploadAudio, createAudio, updateAudios } = hooks.useAudioService();
  const { createTest } = hooks.useTestService();
  const { createQuestionPhoto, createQuestionAudio, updateCorrectAnswers, updateMany } = hooks.useQuestionService();
  const { updateAnswers } = hooks.useAnswerService();
  const { updateQuestionGroup } = hooks.useQuestionGroupService();
  const newQuestionGroup = hooks.useNewQuestionGroup();

  const dispatch = useDispatch();
  const eventLogs = useSelector(changeLog);
  const isAddNew = useSelector(adding);
  const active = useSelector(activeGroup);
  const groupId = active.id;
  const groupName = active.name;
  const isEdit = useSelector(editing);
  const isComplete = useSelector(finished);

  const newQuestions = Array.from({ length: quantityOfQuestions }).map((_, index) => ({
    id: index,
    photoId: index,
    audioId: index,
    photo: '',
    audio: '',
    question: '',

    answers: Array.from({ length: quantityOfAnswersPerQuestion }).map((_, answerIndex) => ({
      id: answerIndex,
      index: answerIndex,
      answer: '',
    })),
    correctAnswerIndex: 0,
  }));

  const handleComplete = async (questions) => {
    if (isAddNew) handleAddNew(questions);
    if (isEdit) handleEdit();
  };

  // handle edit test
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

  // handle upload media files
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

  // handle add new
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
      newTest.questions.map(async (question, index) => {
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
        onAddNewSuccess({ questionGroup: newTest.questionGroup });
        dispatch(toggleAddNew({ toggle: false }));
        dispatch(setActive({ id: newTest.questionGroup.id, name: newTest.questionGroup.name }));
        dispatch(resetChangeLog());
      })
      .catch((e) => console.error(e));
  };

  const handleQuestionsAddNew = () => {
    dispatch(
      changeQuestions({
        questions: newQuestions,
      }),
    );
  };

  // cancel add new
  const handleToggleAddNew = (toggle) => {
    dispatch(toggleAddNew({ toggle }));
    dispatch(deleteQuestionGroup({ groupId: newQuestionGroup.id }));
  };

  return (
    <div className={cx('container')}>
      <QuestionsProvider
        isEnableQuestionText={isEnableQuestionText}
        questions={questions}
        onQuestionTextChange={(question) => dispatch(updateQuestionText(question))}
        onImageUpload={(image) => dispatch(updateQuestionPhoto(image))}
        onAudioUpload={(audio) => dispatch(updateQuestionAudio(audio))}
      >
        <AnswerChangeProvider
          onAnswerChange={(answer) => dispatch(updateAnswer(answer))}
          onCorrectAnswerChange={(correctAnswer) => changeCorrectAnswerIndex(correctAnswer)}
        >
          {isQuestionsLoading ? (
            <Loading />
          ) : (
            <Questions
              isEnableAudio={isEnableAudio}
              isEnablePhoto={isEnablePhoto}
              className={cx('questions')}
              eventLogs={eventLogs}
              data={questions}
              isAddNew={isAddNew}
              groupId={groupId}
              isEdit={isEdit}
              isComplete={isComplete}
              quote={quote}
              quantityOfQuestions={quantityOfQuestions}
              quantityOfAnswersPerQuestion={quantityOfAnswersPerQuestion}
              onComplete={handleComplete}
              onAddNew={handleQuestionsAddNew}
              onToggleComplete={(toggle) => dispatch(toggleComplete({ toggle }))}
              onToggleAddNew={handleToggleAddNew}
              onToggleEdit={(toggle) => dispatch(toggleEdit({ toggle }))}
            />
          )}
        </AnswerChangeProvider>
      </QuestionsProvider>
    </div>
  );
};

export default QuestionSingle;
