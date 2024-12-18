const urls = {
  user: {
    refreshToken: '/api/user/refresh',
    register: '/api/user/register',
    createEditor: '/api/user/create-editor-account',
    login: '/api/user/login',
    logout: '/api/user/logout',
    get: '/api/user/get-by-id/:id',
    getAll: '/api/user/get-all',
    update: '/api/user/:id',
    updateAvatar: '/api/user/update-avatar/:id',
    updatePassword: '/api/user/update-password/:id',
    deleteUser: '/api/user/delete/:id',
    sendOTPEmail: '/api/user/send-otp-email',
    verifyOTP: '/api/user/verify-otp',
    resetPassword: '/api/user/reset-password'
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
    delete: '/api/test/delete/:groupId',
    deleteBundle: '/api/test/delete-bundle/:groupId',
    getUserAnswers: '/api/test/user-answers/:userId/:groupId',
  },

  testTimer: {
    create: '/api/test-timer/:userId/:groupId/:secondsElapsed',
    getByUserId: '/api/test-timer/get-by-user-id/:userId',
    get: '/api/test-timer/:userId/:groupId',
    updateMany: '/api/test-timer/:userId',
  },

  grammar: {
    getAll: '/api/grammar',
    update: '/api/grammar',
    delete: '/api/grammar/:grammarId',
    create: '/api/grammar',
    getByLevelId: '/api/grammar/get-by-level-id/:levelId',
  },

  photo: {
    create: '/api/photo/create',
    upload: '/api/photo/upload',
    delete: '/api/photo/:photoId',
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
    delete: '/api/vocabulary-topic/:topicId',
    update: '/api/vocabulary-topic',
    getAll: '/api/vocabulary-topic',
    getByLevelId: '/api/vocabulary-topic/get-by-level-id/:levelId',
  },

  vocabulary: {
    getByTopicId: '/api/vocabulary/:topicId',
  },

  vocabularyStatuses: {
    getByUserId: '/api/vocabulary-statuses/get-by-user-id/:userId',
    update: '/api/vocabulary-statuses/:userId/:vocabularyId',
  },

  userAnswer: {
    create: '/api/user-answer/:userId/:questionId/:answerId',
    delete: '/api/user-answer/:id',
  },
  questionBundle: {
    createBundlePhoto: '/api/question-bundle/bundle-photo',
    createBundleAudio: '/api/question-bundle/bundle-audio',
    updatePhotos: '/api/question-bundle/photos',
    updateAudios: '/api/question-bundle/audios',
    getByGroupId: '/api/question-bundle/get-by-group-id/:groupId',
    updateMany: '/api/question-bundle/update-many',
  },
  question: {
    updateCorrectAnswers: '/api/question/correct-answer',
    updatePhotos: '/api/question/photos',
    updateAudios: '/api/question/audios',
    createQuestionAudio: '/api/question/question-audio',
    createQuestionPhoto: '/api/question/question-photo',
    getByGroupId: '/api/question/get-by-group-id/:groupId',
    updateMany: '/api/question/update-many',
    save: '/api/question/save',
    saveMany: '/api/question/save-many',
    delete: '/api/question/delete/:id',
  },
  questionGroup: {
    update: '/api/question-group',
    getByPartId: '/api/question-group/by-part-id/:partId',
    getByGrammarId: '/api/question-group/by-grammar-id/:grammarId',
  },
  analytic: {
    getAverageTimePerDay: '/api/analytic/average-time-per-day',
    getTopUsersByPartId: '/api/analytic/top-users-by-part-id/:partId/:topUsers',
    getTopUsersByGrammarId: '/api/analytic/top-users-by-grammar-id/:grammarId/:topUsers',

    getVocabularyLearningPercentage: '/api/analytic/get-vocabulary-learning-percentage/:userId/:status',
    getCorrectAnswerPercentageByGrammars: '/api/analytic/get-correct-answer-percentage-by-grammars/:userId',
    getCorrectAnswerPercentageByParts: '/api/analytic/get-correct-answer-percentage-by-parts/:userId',
  },
};

export default urls;
