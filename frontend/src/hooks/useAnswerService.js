import config from '~/config';
import useAxiosPrivate from './useAxiosPrivate';
import { useDispatch } from 'react-redux';
import { updateAnswer } from '~/redux/features/testSlice';
// import { setWithExpiry } from '~/utils/localStorageUtils';

const useAnswerService = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  // update answers
  const updateAnswers = async (answers) => {
    try {
      const response = await axiosPrivate.put(config.urls.answer.update, { answers });

      // update answer in test slice
      answers.forEach((answer) => {
        dispatch(updateAnswer({ answerId: answer.id, questionId: answer.questionId, answerText: answer.answer }));
      });

      // setWithExpiry(`questions_${groupId}`, questions);

      return response?.data;
    } catch (e) {
      throw e;
    }
  };

  return { updateAnswers };
};

export default useAnswerService;
