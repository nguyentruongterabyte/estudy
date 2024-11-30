import config from '~/config';
import useAxiosPrivate from './useAxiosPrivate';

const useVocabularyTopicService = () => {
  const axiosPrivate = useAxiosPrivate();

  // handle save vocabulary topic
  const createVocabularyTopic = async (data) => {
    // data (object) includes `name` and `vocabularies` (array)
    try {
      const response = await axiosPrivate.post(config.urls.vocabularyTopic.create, data);

      return response?.data?.data; // return object {`newTopic`, `newVocabularies`}
    } catch (e) {
      throw e;
    }
  };

  // handle get all vocabulary topics
  const getAllVocabularyTopics = async () => {
    try {
      const response = await axiosPrivate.get(config.urls.vocabularyTopic.getAll);

      return response?.data?.data; // return array of topics
    } catch (e) {
      throw e;
    }
  };

  // handle update
  const updateVocabularyTopic = async (data) => {
    // data includes `id`, `name` and `vocabularies`
    try {
      const response = await axiosPrivate.put(config.urls.vocabularyTopic.update, data);
      return response?.data?.data; // return `id`, `name`, `vocabularies`
    } catch (e) {
      throw e;
    }
  };

  // handle delete
  const deleteTopic = async (topicId) => {
    try {
      const response = await axiosPrivate.delete(`${config.urls.vocabularyTopic.delete}/${topicId}`);
      return response?.data;
    } catch (e) {
      throw e;
    }
  };

  return { createVocabularyTopic, getAllVocabularyTopics, updateVocabularyTopic, deleteTopic };
};

export default useVocabularyTopicService;
