import config from '~/config';
import useAxiosPrivate from './useAxiosPrivate';

const useAnswerService = () => {
  const axiosPrivate = useAxiosPrivate();

  // update answers
  const updateAnswers = async (answers) => {
    try {
      const response = await axiosPrivate.put(config.urls.answer.update, { answers });
      
      return response?.data;
    } catch (e) {
      throw e;
    }
  };

  return { updateAnswers };
};

export default useAnswerService;
