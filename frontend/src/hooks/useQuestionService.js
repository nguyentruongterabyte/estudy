// import { useSelector } from 'react-redux';

import config from '~/config';
// import { getWithExpiry, setWithExpiry } from '~/utils/localStorageUtils';
import useAxiosPrivate from './useAxiosPrivate';
// import { questionList, testGroupId } from '~/redux/features/testSlice';

const useQuestionService = () => {
  const axiosPrivate = useAxiosPrivate();
  // const questions = useSelector(questionList);
  // const groupId = useSelector(testGroupId);
  // update correct answers
  const updateCorrectAnswers = async (correctAnswers) => {
    try {
      const response = await axiosPrivate.put(config.urls.question.updateCorrectAnswers, { correctAnswers });
      // setWithExpiry(`questions_${groupId}`, questions);
      return response?.data;
    } catch (e) {
      throw e;
    }
  };

  // create question audio
  const createQuestionAudio = async (questionId, audioId) => {
    try {
      const newQuestionAudio = await axiosPrivate.post(config.urls.test.createQuestionAudio, {
        questionId,
        audioId,
      });
      return newQuestionAudio;
    } catch (e) {
      throw e;
    }
  };

  // update photos
  const updatePhotos = async (photos) => {
    try {
      const response = await axiosPrivate.put(config.urls.question.updatePhotos, { photos });
      console.log(response?.data);
      return response?.data;
    } catch (e) {
      throw e;
    }
  };

  // update photos
  const updateAudios = async (audios) => {
    try {
      const response = await axiosPrivate.put(config.urls.question.updatePhotos, { audios });
      console.log(response?.data);
      return response?.data;
    } catch (e) {
      throw e;
    }
  };

  // create question photo
  const createQuestionPhoto = async (questionId, filePath) => {
    try {
      const newPhoto = await axiosPrivate.post(config.urls.test.createQuestionPhoto, {
        questionId,
        filePath,
      });

      return newPhoto;
    } catch (e) {
      throw e;
    }
  };

  // get question when knew group id
  const getQuestionsByGroupId = async (groupId, audio = false, photo = false) => {
    // Check if questions of group id exists in local storage
    // const cachedQuestions = getWithExpiry(`questions_${groupId}`);

    // if (cachedQuestions) return cachedQuestions;
    const params = {};
    if (audio) params.audio = true;
    if (photo) params.photo = true;

    try {
      const response = await axiosPrivate.get(`${config.urls.test.questions}/${groupId}`, {
        params,
      });
      const questions = response?.data?.data;
      // save localStorage
      // setWithExpiry(`questions_${groupId}`, questions);
      return questions;
    } catch (e) {
      throw e;
    }
  };

  // get group question when knew part id
  const getQuestionGroups = async (partId) => {
    try {
      const response = await axiosPrivate.get(`${config.urls.test.questionGroups}/${partId}`);
      const questionGroups = response?.data?.data;

      return questionGroups;
    } catch (e) {
      throw e;
    }
  };

  return {
    updateCorrectAnswers,
    getQuestionGroups,
    getQuestionsByGroupId,
    createQuestionPhoto,
    createQuestionAudio,
    updatePhotos,
    updateAudios
  };
};

export default useQuestionService;
