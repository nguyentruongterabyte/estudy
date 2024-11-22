import { useSelector } from 'react-redux';
import { questionGroupList } from '~/redux/features/questionGroupsSilce';

const useNewQuestionGroup = () => {
  const questionGroups = useSelector(questionGroupList);
  const newQuestionGroup = { id: 9999999, name: `Test ${questionGroups.length + 1}` };
  return newQuestionGroup;
};

export default useNewQuestionGroup;
