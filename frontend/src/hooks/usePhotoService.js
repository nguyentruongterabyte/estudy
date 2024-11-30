import config from '~/config';
import useAxiosPrivate from './useAxiosPrivate';

const usePhotoService = () => {
  const axiosPrivate = useAxiosPrivate();

  // create photo
  const createPhoto = async (filePath) => {
    try {
      const response = await axiosPrivate.post(config.urls.photo.create, { filePath });
      // return new photo
      return response?.data?.data;
    } catch (e) {
      throw e;
    }
  };

  // update photos
  const updatePhotos = async (photos) => {
    try {
      const response = await axiosPrivate.put(config.urls.question.updatePhotos, { photos });
      return response?.data;
    } catch (e) {
      throw e;
    }
  };

  const uploadPhoto = async (file) => {
    const formData = new FormData();
    formData.append('photo', file);
    try {
      const response = await axiosPrivate.post(config.urls.photo.upload, formData, {
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

  // delete photo
  const deletePhoto = async (photoId) => {
    try {
      const response = await axiosPrivate.delete(`${config.urls.photo.delete}/${photoId}`);
      return response?.data;
    } catch (e) {
      throw e;
    }
  };

  return { uploadPhoto, createPhoto, updatePhotos, deletePhoto };
};

export default usePhotoService;
