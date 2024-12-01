import config from '~/config';
import useAxiosPrivate from './useAxiosPrivate';

const useCorrectAnswerService = () => {
  const axiosPrivate = useAxiosPrivate();

  // update correct answers by question id
  const updateManyByQuestionId = async (correctAnswers) => {
    try {
      const response = await axiosPrivate.put(config.urls.correctAnswer.updateMany, { correctAnswers });

      return response?.data;
    } catch (e) {
      throw e;
    }
  };

  return { updateManyByQuestionId };
};

export default useCorrectAnswerService;
