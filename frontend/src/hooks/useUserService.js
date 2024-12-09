import config from '~/config';
import useAxiosPrivate from './useAxiosPrivate';

const useUserService = () => {
  const axiosPrivate = useAxiosPrivate();

  const getUserById = async (id) => {
    try {
      const response = await axiosPrivate.get(`${config.urls.user.get}/${id}`);
      return response?.data?.data; // return user object;
    } catch (e) {
      throw e;
    }
  };

  const updateUser = async (id, user) => {
    try {
      const response = await axiosPrivate.put(`${config.urls.user.update}/${id}`, {
        user: {
          ...user,
          id,
        },
      });
      return response?.data;
    } catch (e) {
      throw e;
    }
  };

  const updateAvatar = async (id, filePath) => {
    try {
      const response = await axiosPrivate.put(`${config.urls.user.updateAvatar}/${id}`, {
        filePath,
      });
      return response?.data;
    } catch (e) {
      throw e;
    }
  };

  const getAllUser = async () => {
    try {
      const response = await axiosPrivate.get(config.urls.user.getAll);
      return response?.data?.data; // return array of users
    } catch (e) {
      throw e;
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await axiosPrivate.delete(`${config.urls.user.deleteUser}/${id}`);
      return response?.data;
    } catch (e) {
      throw e;
    }
  };

  return { getUserById, updateUser, updateAvatar, getAllUser, deleteUser };
};

export default useUserService;
