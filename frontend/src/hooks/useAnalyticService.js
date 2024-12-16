import config from '~/config';
import useAxiosPrivate from './useAxiosPrivate';

const useAnalyticService = () => {
  const axiosPrivate = useAxiosPrivate();

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

  return { getAverageTimePerDay, getTopUsersByPartId };
};

export default useAnalyticService;
