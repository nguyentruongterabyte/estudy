import config from '~/config';
import useAxiosPrivate from './useAxiosPrivate';

const useVocabularyService = () => {
  const axiosPrivate = useAxiosPrivate();

  const getByTopicId = async (topicId) => {
    try {
      const response = await axiosPrivate.get(`${config.urls.vocabulary.getByTopicId}/${topicId}`);

      return response?.data?.data; // return array of vocabularies
    } catch (e) {
      throw e;
    }
  };

  return { getByTopicId };
};

export default useVocabularyService;
