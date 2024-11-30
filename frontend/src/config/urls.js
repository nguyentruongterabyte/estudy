const urls = {
  user: {
    refreshToken: '/api/user/refresh',
    register: '/api/user/register',
    login: '/api/user/login',
    logout: '/api/user/logout',
  },
  test: {
    create: '/api/test/create',
    createBundle: '/api/test/create-bundle',
    delete: '/api/test/delete',
    deleteBundle: '/api/test/delete-bundle',
    getUserAnswers: '/api/test/user-answers',
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

  vocabularyTopic: {
    create: '/api/vocabulary-topic',
    delete: '/api/vocabulary-topic',
    update: '/api/vocabulary-topic',
    getAll: '/api/vocabulary-topic',
  },
  vocabulary: {
    getByTopicId: '/api/vocabulary',
  },
  userAnswer: {
    create: '/api/user-answer',
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
    getAll: '/api/question-group/all',
  },
};

export default urls;
