import config from '~/config';
import useAxiosPrivate from './useAxiosPrivate';
import useUserId from './useUserId';

const useTestTimerService = () => {
  const userId = useUserId();
  const axiosPrivate = useAxiosPrivate();
  // handle get test timer by userId and groupId
  const getTestTimer = async (groupId) => {
    // console.log(userId);

    try {
      const response = await axiosPrivate.get(`${config.urls.testTimer.get}/${userId}/${groupId}`);
      // console.log(groupId, response?.data?.data);
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

  // handle create test timer
  const createTestTimer = async (groupId, secondsElapsed) => {
    try {
      const response = await axiosPrivate.get(`${config.urls.testTimer.create}/${userId}/${groupId}/${secondsElapsed}`);
      return response?.data?.data;
    } catch (error) {
      throw error;
    }
  };

  return { getTestTimer, createTestTimer };
};

export default useTestTimerService;
