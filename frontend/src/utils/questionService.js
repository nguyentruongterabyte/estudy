import config from '~/config';
import { axiosPrivate } from './axios';
import { getWithExpiry, setWithExpiry } from './localStorageUtils';

// get question when knew group id
export const getQuestionsByGroupId = async (groupId) => {
  // Check if questions of group id exists in local storage
  const cachedQuestions = getWithExpiry(`questions_${groupId}`);

  if (cachedQuestions) return cachedQuestions;

  try {
    const response = await axiosPrivate.get(`${config.urls.test.questions}/${groupId}`);
    const questions = response?.data?.data;
    // save localStorage
    setWithExpiry(`questions_${groupId}`, questions);
    return questions;
  } catch (e) {
    throw e;
  }
};

// get group question when knew part id
export const getQuestionGroups = async (partId) => {
  // Check if question groups of part id exist in local storage
  const cachedGroups = getWithExpiry(`questionGroups_${partId}`);

  if (cachedGroups) return cachedGroups;

  try {
    const response = await axiosPrivate.get(`${config.urls.test.questionGroups}/${partId}`);
    const questionGroups = response?.data?.data;

    // save localStorage
    if (questionGroups) {
      setWithExpiry(`questionGroups_${partId}`, questionGroups);
    }
    return questionGroups;
  } catch (e) {
    throw e;
  }
};
