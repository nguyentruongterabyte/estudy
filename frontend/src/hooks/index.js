import useAuth from './useAuth';
import useInput from './useInput';
import useLocalStorage from './useLocalStorage';
import useLogout from './useLogout';
import useRefreshToken from './useRefreshToken';
import useToggle from './useToggle';
import useAxiosPrivate from './useAxiosPrivate';
import useQuestionService from './useQuestionService';
import useAudioService from './useAudioService';
import usePhotoService from './usePhotoService';
const hooks = {
  useAuth,
  useLocalStorage,
  useInput,
  useLogout,
  useRefreshToken,
  useToggle,
  useAxiosPrivate,
  useQuestionService,
  useAudioService,
  usePhotoService
};

export default hooks;
