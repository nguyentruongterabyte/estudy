import config from '~/config';
import useAxiosPrivate from './useAxiosPrivate';

const usePartService = () => {
  const axiosPrivate = useAxiosPrivate();

  const getAllParts = async () => {
    try {
      const response = await axiosPrivate.get(config.urls.part.getAll);
      return response?.data?.data; // return array of levels
    } catch (e) {
      throw e;
    }
  };
  return { getAllParts };
};

export default usePartService;
