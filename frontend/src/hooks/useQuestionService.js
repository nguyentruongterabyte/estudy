// import { useSelector } from 'react-redux';

import config from '~/config';
import useAxiosPrivate from './useAxiosPrivate';

const useQuestionService = () => {
  const axiosPrivate = useAxiosPrivate();
  const updateCorrectAnswers = async (correctAnswers) => {
    try {
      const response = await axiosPrivate.put(config.urls.question.updateCorrectAnswers, { correctAnswers });
      return response?.data;
    } catch (e) {
      throw e;
    }
  };

  // create question audio
  const createQuestionAudio = async (questionId, audioId) => {
    try {
      const newQuestionAudio = await axiosPrivate.post(config.urls.question.createQuestionAudio, {
        questionId,
        audioId,
      });
      return newQuestionAudio;
    } catch (e) {
      throw e;
    }
  };

  // create question photo
  const createQuestionPhoto = async (questionId, photoId) => {
    try {
      const newPhoto = await axiosPrivate.post(config.urls.question.createQuestionPhoto, {
        questionId,
        photoId,
      });

      return newPhoto;
    } catch (e) {
      throw e;
    }
  };

  // update photos
  const updatePhotos = async (photos) => {
    try {
      const response = await axiosPrivate.put(config.urls.question.updatePhotos, { photos });
      return response?.data;
    } catch (e) {
      throw e;
    }
  };

  // update photos
  const updateAudios = async (audios) => {
    try {
      const response = await axiosPrivate.put(config.urls.question.updateAudios, { audios });
      return response?.data;
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
      const response = await axiosPrivate.get(`${config.urls.question.getByGroupId}/${groupId}`, {
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
      const response = await axiosPrivate.get(`${config.urls.questionGroup.getAll}/${partId}`);
      const questionGroups = response?.data?.data;

      return questionGroups;
    } catch (e) {
      throw e;
    }
  };

  const updateMany = async (questions) => {
    try {
      const response = await axiosPrivate.put(config.urls.question.updateMany, { questions });
      return response?.data;
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
    updateAudios,
    updateMany,
  };
};

export default useQuestionService;
