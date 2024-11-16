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
import useTestService from './useTestService';
import useAnswerService from './useAnswerService';
import useQuestionGroupService from './useQuestionGroupService';
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
  usePhotoService,
  useTestService,
  useAnswerService,
  useQuestionGroupService
};

export default hooks;
