import config from '~/config';
import useAxiosPrivate from './useAxiosPrivate';

const usePhotoService = () => {
  const axiosPrivate = useAxiosPrivate();

  const uploadPhoto = async (file) => {
    const formData = new FormData();
    formData.append('photo', file);
    try {
      const response = await axiosPrivate.post(config.urls.test.uploadPhoto, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const photoUrl = response?.data?.data;
      return photoUrl;
    } catch (e) {
      throw e;
    }
  };

  return { uploadPhoto };
};

export default usePhotoService;
