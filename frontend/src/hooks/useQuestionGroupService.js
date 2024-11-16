import config from '~/config';
import useAxiosPrivate from './useAxiosPrivate';
import { useDispatch } from 'react-redux';
import { changeGroupName } from '~/redux/features/questionGroupsSilce';

const useQuestionGroupService = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const updateQuestionGroup = async (questionGroup) => {
    try {
      const response = await axiosPrivate.put(config.urls.questionGroup.update, { questionGroup });
      dispatch(changeGroupName({ id: questionGroup.id, name: questionGroup.name }));
      return response?.data;
    } catch (e) {
      throw e;
    }
  };

  return { updateQuestionGroup };
};

export default useQuestionGroupService;
