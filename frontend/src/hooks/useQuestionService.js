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
      const newQuestionPhoto = await axiosPrivate.post(config.urls.question.createQuestionPhoto, {
        questionId,
        photoId,
      });

      return newQuestionPhoto;
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

  // handle save question
  const saveQuestion = async (question) => {
    try {
      const response = await axiosPrivate.post(config.urls.question.save, { question });
      return response?.data?.data; // return new question
    } catch (e) {
      throw e;
    }
  };

  // handle save questions
  const saveQuestions = async (questions) => {
    try {
      const response = await axiosPrivate.post(config.urls.question.saveMany, { questions });
      return response?.data?.data; // return new questions
    } catch (e) {
      throw e;
    }
  };

  // handle delete question
  const deleteQuestion = async (id) => {
    try {
      const response = await axiosPrivate.delete(`${config.urls.question.delete}/${id}`);
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
    updateMany,
    saveQuestion,
    saveQuestions,
    deleteQuestion,
  };
};

export default useQuestionService;
