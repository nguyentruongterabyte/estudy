import config from '~/config';
import useAxiosPrivate from './useAxiosPrivate';

const useVocaburyPracticeStatusesService = () => {
  const axiosPrivate = useAxiosPrivate();

  const getVocabularyStatusesByUserId = async (userId) => {
    try {
      const response = await axiosPrivate.get(`${config.urls.vocabularyStatuses.getByUserId}/${userId}`);
      return response?.data?.data; // return array of vocabulary statuses of user ('vocabularyId', 'topicId', 'status')
    } catch (e) {
      throw e;
    }
  };

  const updateVocabularyStatus = async (userId, vocabularyId, status) => {
    try {
      const response = await axiosPrivate.put(`${config.urls.vocabularyStatuses.update}/${userId}/${vocabularyId}`, {
        status,
      });
      return response?.data?.data;
    } catch (e) {
      throw e;
    }
  };

  return { getVocabularyStatusesByUserId, updateVocabularyStatus };
};

export default useVocaburyPracticeStatusesService;
