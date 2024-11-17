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

  const deleteTest = async ( groupId ) => {
    try {
      const response = await axiosPrivate.delete(`${config.urls.test.delete}/${groupId}`);
      return response?.data;
    } catch (e) {
      throw e;
    }
  }

  return { createTest, deleteTest };
};

export default useTestService;
