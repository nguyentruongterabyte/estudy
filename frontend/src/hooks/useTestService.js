import useAxiosPrivate from './useAxiosPrivate';
import config from '~/config';

const useTestService = () => {
  const axiosPrivate = useAxiosPrivate();

  // create test
  const createTest = async (data) => {
    try {
      const response = await axiosPrivate.post(config.urls.test.create, data);
      return response?.data?.data;
    } catch (e) {
      throw e;
    }
  };

  const deleteTest = async (groupId) => {
    try {
      const response = await axiosPrivate.delete(`${config.urls.test.delete}/${groupId}`);
      return response?.data;
    } catch (e) {
      throw e;
    }
  };

  // create bundle test
  const createBundleTest = async (data) => {
    try {
      const response = await axiosPrivate.post(config.urls.test.createBundle, data);
      return response?.data?.data;
    } catch (e) {
      throw e;
    }
  };

  const deleteBundleTest = async (groupId) => {
    try {
      const response = await axiosPrivate.delete(`${config.urls.test.deleteBundle}/${groupId}`);
      return response?.data;
    } catch (e) {
      throw e;
    }
  };

  // get user answer
  const getUserAnswers = async (userId, groupId) => {
    try {
      const response = await axiosPrivate.get(`${config.urls.test.getUserAnswers}/${userId}/${groupId}`);
      return response?.data?.data; // return user answer
    } catch (e) {
      throw e;
    }
  };
  return { createTest, createBundleTest, deleteTest, deleteBundleTest, getUserAnswers };
};

export default useTestService;
