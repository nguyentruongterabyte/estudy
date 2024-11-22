import config from '~/config';
import useAxiosPrivate from './useAxiosPrivate';

const useAudioService = () => {
  const axiosPrivate = useAxiosPrivate();

  // create audio
  const createAudio = async (audioLink) => {
    try {
      const response = await axiosPrivate.post(config.urls.audio.create, { audioLink });
      // return new audio
      return response?.data?.data;
    } catch (e) {
      throw e;
    }
  };

  // update audio
  const updateAudios = async (audios) => {
    try {
      const response = await axiosPrivate.put(config.urls.question.updateAudios, { audios });
      return response?.data;
    } catch (e) {
      throw e;
    }
  };

  // upload audio and get its url
  const uploadAudio = async (file) => {
    const formData = new FormData();
    formData.append('audio', file);
    try {
      const response = await axiosPrivate.post(config.urls.audio.upload, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const audioUrl = response?.data?.data;
      return audioUrl;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  return { uploadAudio, createAudio, updateAudios };
};

export default useAudioService;
