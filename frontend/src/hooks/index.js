import useAuth from './useAuth';
import useInput from './useInput';
import useLocalStorage from './useLocalStorage';
import useLogout from './useLogout';
import useRefreshToken from './useRefreshToken';
import useToggle from './useToggle';
import useAxiosPrivate from './useAxiosPrivate';
import useDebounce from './useDebounce';

import useQuestionService from './useQuestionService';
import useAudioService from './useAudioService';
import usePhotoService from './usePhotoService';
import useTestService from './useTestService';
import useAnswerService from './useAnswerService';
import useQuestionGroupService from './useQuestionGroupService';
import useQuestionBundleService from './useQuestionBundleService';
import useUserAnswerService from './useUserAnswerService';
import useVocabularyTopicService from './useVocabularyTopicService';
import useVocabularyService from './useVocabularyService';
import useNewVocabularyTopic from './useNewVocabularyTopic';
import useCorrectAnswerService from './useCorrectAnswerService';
import useSaveData from './useSaveData';
import useVocaburyPracticeStatusesService from './useVocaburyPracticeStatusesService';
import useGrammarService from './useGrammarService';
import useNewGrammar from './useNewGrammar';
import useUserService from './useUserService';

import useNewQuestionGroup from './useNewQuestionGroup';
const hooks = {
  useAuth,
  useLocalStorage,
  useDebounce,
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
  useQuestionBundleService,
  useQuestionGroupService,
  useNewQuestionGroup,
  useUserAnswerService,
  useVocabularyTopicService,
  useVocabularyService,
  useNewVocabularyTopic,
  useCorrectAnswerService,
  useVocaburyPracticeStatusesService,
  useSaveData,
  useGrammarService,
  useNewGrammar,
  useUserService,
};

export default hooks;
