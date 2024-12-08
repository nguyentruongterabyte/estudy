const urls = {
  user: {
    refreshToken: '/api/user/refresh',
    register: '/api/user/register',
    login: '/api/user/login',
    logout: '/api/user/logout',
    get: '/api/user/get-by-id/:id',
    update: '/api/user/:id',
    updateAvatar: '/api/user/update-avatar/:id'
  },
  test: {
    create: '/api/test/create',
    createBundle: '/api/test/create-bundle',
    delete: '/api/test/delete/:groupId',
    deleteBundle: '/api/test/delete-bundle/:groupId',
    getUserAnswers: '/api/test/user-answers/:userId/:groupId',
  },

  grammar: {
    getAll: '/api/grammar',
    update: '/api/grammar',
    delete: '/api/grammar/:grammarId',
    create: '/api/grammar',
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
};

export default urls;
