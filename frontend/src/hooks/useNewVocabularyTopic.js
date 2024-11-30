import { useSelector } from 'react-redux';
import { vocabularyTopicList } from '~/redux/features/vocabularyTopicsSlice';

const useNewVocabularyTopic = () => {
  const vocabularyTopics = useSelector(vocabularyTopicList);
  const newVocabularyTopic = { id: 9999999, name: `Topic ${vocabularyTopics.length + 1}` };
  return newVocabularyTopic;
};

export default useNewVocabularyTopic;
