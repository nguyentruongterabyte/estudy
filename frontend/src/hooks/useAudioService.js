import config from '~/config';
import useAxiosPrivate from './useAxiosPrivate';

const useAudioService = () => {
  const axiosPrivate = useAxiosPrivate();

  const uploadAudio = async (file) => {
    const formData = new FormData();
    formData.append('audio', file);
    try {
      const response = await axiosPrivate.post(config.urls.test.uploadAudio, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const audioUrl = response?.data?.data;
      return audioUrl;
    } catch (e) {
      console.log( e );
      throw e;
    }
  };

  return { uploadAudio };
};

export default useAudioService;
