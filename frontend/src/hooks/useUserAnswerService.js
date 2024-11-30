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

  return { createUserAnswer };
};

export default useUserAnswerService;
