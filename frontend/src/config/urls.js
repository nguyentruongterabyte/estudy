const urls = {
  user: {
    refreshToken: '/api/user/refresh',
    register: '/api/user/register',
    createEditor: '/api/user/create-editor-account',
    login: '/api/user/login',
    logout: '/api/user/logout',
    get: '/api/user/get-by-id',
    getAll: '/api/user/get-all',
    update: '/api/user',
    updateAvatar: '/api/user/update-avatar',
    updatePassword: '/api/user/update-password',
    deleteUser: '/api/user/delete',
  },
  level: {
    getAll: '/api/level',
  },
  part: {
    getAll: '/api/part',
  },
  test: {
    create: '/api/test/create',
    createBundle: '/api/test/create-bundle',
    delete: '/api/test/delete',
    deleteBundle: '/api/test/delete-bundle',
    getUserAnswers: '/api/test/user-answers',
  },

  testTimer: {
    create: '/api/test-timer',
    getByUserId: '/api/test-timer/get-by-user-id',
    get: '/api/test-timer',
    updateMany: '/api/test-timer',
  },

  grammar: {
    getAll: '/api/grammar',
    update: '/api/grammar',
    delete: '/api/grammar',
    create: '/api/grammar',
    getByLevelId: '/api/grammar/get-by-level-id',
  },

  photo: {
    create: '/api/photo/create',
    upload: '/api/photo/upload',
    delete: '/api/photo',
  },

  audio: {
    create: '/api/audio/create',
    upload: '/api/audio/upload',
  },
  answer: {
    update: '/api/answer',
  },

  correctAnswer: {
    updateMany: '/api/correct-answer',
  },

  vocabularyTopic: {
    create: '/api/vocabulary-topic',
    delete: '/api/vocabulary-topic',
    update: '/api/vocabulary-topic',
    getAll: '/api/vocabulary-topic',
    getByLevelId: '/api/vocabulary-topic/get-by-level-id',
  },
  vocabulary: {
    getByTopicId: '/api/vocabulary',
  },

  vocabularyStatuses: {
    getByUserId: '/api/vocabulary-statuses/get-by-user-id',
    update: '/api/vocabulary-statuses',
  },

  userAnswer: {
    create: '/api/user-answer',
    delete: '/api/user-answer',
  },
  questionBundle: {
    createBundlePhoto: '/api/question-bundle/bundle-photo',
    createBundleAudio: '/api/question-bundle/bundle-audio',
    updatePhotos: '/api/question-bundle/photos',
    updateAudios: '/api/question-bundle/audios',
    getByGroupId: '/api/question-bundle/get-by-group-id',
    updateMany: '/api/question-bundle/update-many',
  },
  question: {
    updateCorrectAnswers: '/api/question/correct-answer',
    updatePhotos: '/api/question/photos',
    updateAudios: '/api/question/audios',
    createQuestionAudio: '/api/question/question-audio',
    createQuestionPhoto: '/api/question/question-photo',
    getByGroupId: '/api/question/get-by-group-id',
    updateMany: '/api/question/update-many',
    save: '/api/question/save',
    saveMany: '/api/question/save-many',
    delete: '/api/question/delete',
  },
  questionGroup: {
    update: '/api/question-group',
    getByPartId: '/api/question-group/by-part-id',
    getByGrammarId: '/api/question-group/by-grammar-id',
  },
  analytic: {
    getAverageTimePerDay: '/api/analytic/average-time-per-day',
    getTopUsersByPartId: '/api/analytic/top-users-by-part-id',
    getTopUsersByGrammarId: '/api/analytic/top-users-by-grammar-id',

    getVocabularyLearningPercentage: '/api/analytic/get-vocabulary-learning-percentage',
    getCorrectAnswerPercentageByGrammars: '/api/analytic/get-correct-answer-percentage-by-grammars',
    getCorrectAnswerPercentageByParts: '/api/analytic/get-correct-answer-percentage-by-parts',
  },
};

export default urls;
