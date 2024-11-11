import config from '~/config';
import { getWithExpiry, setWithExpiry } from '~/utils/localStorageUtils';

const { default: useAxiosPrivate } = require('./useAxiosPrivate');

const useQuestionService = () => {
  const axiosPrivate = useAxiosPrivate();

  // get question when knew group id
  const getQuestionsByGroupId = async (groupId, audio = false, photo = false) => {
    // Check if questions of group id exists in local storage
    const cachedQuestions = getWithExpiry(`questions_${groupId}`);

    if (cachedQuestions) return cachedQuestions;
    const params = {};
    if (audio) params.audio = true;
    if (photo) params.photo = true;

    try {
      const response = await axiosPrivate.get(`${config.urls.test.questions}/${groupId}`, {
        params,
      });
      const questions = response?.data?.data;
      // save localStorage
      setWithExpiry(`questions_${groupId}`, questions);
      return questions;
    } catch (e) {
      throw e;
    }
  };

  // get group question when knew part id
  const getQuestionGroups = async (partId) => {
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

  return { getQuestionGroups, getQuestionsByGroupId };
};

export default useQuestionService;
