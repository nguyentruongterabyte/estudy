import config from '~/config';
import useAxiosPrivate from './useAxiosPrivate';
import useUserId from './useUserId';

const useAnalyticService = () => {
  const axiosPrivate = useAxiosPrivate();
  const userId = useUserId();

  const getAverageTimePerDay = async () => {
    try {
      const response = await axiosPrivate.get(config.urls.analytic.getAverageTimePerDay);
      return response?.data?.data;
    } catch (e) {
      throw e;
    }
  };

  const getTopUsersByPartId = async (partId, topUsers) => {
    try {
      const response = await axiosPrivate.get(`${config.urls.analytic.getTopUsersByPartId}/${partId}/${topUsers}`);
      return response?.data?.data;
    } catch (e) {
      throw e;
    }
  };

  const getTopUsersByGrammarId = async (grammarId, topUsers) => {
    try {
      const response = await axiosPrivate.get(
        `${config.urls.analytic.getTopUsersByGrammarId}/${grammarId}/${topUsers}`,
      );
      return response?.data?.data;
    } catch (e) {
      throw e;
    }
  };

  const getCorrectAnswerPercentageByParts = async (partIds = []) => {
    try {
      const response = await axiosPrivate.post(`${config.urls.analytic.getCorrectAnswerPercentageByParts}/${userId}`, {
        partIds,
      });

      const percentage = response?.data?.data;
      return percentage;
    } catch (e) {
      throw e;
    }
  };

  const getCorrectAnswerPercentageByGrammars = async () => {
    try {
      const response = await axiosPrivate.get(`${config.urls.analytic.getCorrectAnswerPercentageByGrammars}/${userId}`);

      const percentage = response?.data?.data;
      return percentage;
    } catch (e) {
      throw e;
    }
  };

  const getVocabularyLearningPercentage = async (status) => {
    try {
      const response = await axiosPrivate.get(
        `${config.urls.analytic.getVocabularyLearningPercentage}/${userId}/${status}`,
      );

      const percentage = response?.data?.data;
      return percentage;
    } catch (e) {
      throw e;
    }
  };

  return {
    getVocabularyLearningPercentage,
    getCorrectAnswerPercentageByGrammars,
    getCorrectAnswerPercentageByParts,
    getAverageTimePerDay,
    getTopUsersByPartId,
    getTopUsersByGrammarId,
  };
};

export default useAnalyticService;
