import config from '~/config';
import useAxiosPrivate from './useAxiosPrivate';

const useUserAnswerService = () => {
  const axiosPrivate = useAxiosPrivate();

  // handle save user answer
  const createUserAnswer = async (userId, questionId, answerId) => {
    try {
      const response = await axiosPrivate.get(`${config.urls.userAnswer.create}/${userId}/${questionId}/${answerId}`);
      return response?.data?.data; //return new user answer
    } catch (e) {
      throw e;
    }
  };

  // handle delete user answers
  const deleteUserAnswers = async (userId, userAnswers = []) => {
    try {
      const response = await axiosPrivate.delete(`${config.urls.userAnswer.delete}/${userId}`, {
        data: { userAnswers },
      });
      return response?.data;
    } catch (e) {
      throw e;
    }
  };

  return { createUserAnswer, deleteUserAnswers };
};

export default useUserAnswerService;
