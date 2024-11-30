import config from '~/config';
import useAxiosPrivate from './useAxiosPrivate';
const useQuestionBundleService = () => {
  const axiosPrivate = useAxiosPrivate();

  // create question audio
  const createBundleAudio = async (bundleId, audioId) => {
    try {
      const newBundleAudio = await axiosPrivate.post(config.urls.questionBundle.createBundleAudio, {
        bundleId,
        audioId,
      });

      return newBundleAudio;
    } catch (e) {
      throw e;
    }
  };

  const createBundlePhoto = async (bundleId, photoId) => {
    try {
      const newBundlePhoto = await axiosPrivate.post(config.urls.questionBundle.createBundlePhoto, {
        bundleId,
        photoId,
      });

      return newBundlePhoto;
    } catch (e) {
      throw e;
    }
  };

  // get question when knew group id
  const getQuestionBundlesByGroupId = async (groupId, audio = false, photo = false) => {
    const params = {};
    if (audio) params.audio = true;
    if (photo) params.photo = true;

    try {
      const response = await axiosPrivate.get(`${config.urls.questionBundle.getByGroupId}/${groupId}`, {
        params,
      });

      const bundles = response?.data?.data;
      return bundles;
    } catch (e) {
      throw e;
    }
  };

  const updateManyBundles = async ( questionBundles ) => {
    try {
      const response = await axiosPrivate.put(config.urls.questionBundle.updateMany, { questionBundles });
      return response?.data;
    } catch (e) {
      throw e;
    }
  }

  return {
    createBundleAudio,
    createBundlePhoto,
    getQuestionBundlesByGroupId,
    updateManyBundles
  };
};

export default useQuestionBundleService;
