import config from '~/config';
import useAxiosPrivate from './useAxiosPrivate';
import { useUserMode } from '~/context/UserModeProvider';

const useUserAnswerService = () => {
  const axiosPrivate = useAxiosPrivate();
  const { userId } = useUserMode();

  // handle save user answer
  const createUserAnswer = async (questionId, answerId) => {
    try {
      const response = await axiosPrivate.get(`${config.urls.userAnswer.create}/${userId}/${questionId}/${answerId}`);
      return response?.data?.data; //return new user answer
    } catch (e) {
      throw e;
    }
  };

  // handle delete user answers
  const deleteUserAnswers = async (userAnswers = []) => {
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
