import config from '~/config';
import useAxiosPrivate from './useAxiosPrivate';

const useLevelService = () => {
  const axiosPrivate = useAxiosPrivate();

  const getAllLevels = async () => {
    try {
      const response = await axiosPrivate.get(config.urls.level.getAll);
      return response?.data?.data; // return array of levels
    } catch (e) {
      throw e;
    }
  };
  return { getAllLevels };
};

export default useLevelService;
