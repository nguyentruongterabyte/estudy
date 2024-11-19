const urls = {
  user: {
    refreshToken: '/api/user/refresh',
    register: '/api/user/register',
    login: '/api/user/login',
    logout: '/api/user/logout',
  },
  test: {
    create: '/api/test/create',
    delete: '/api/test/delete/:groupId',
  },
  photo: {
    create: '/api/photo/create',
    upload: '/api/photo/upload',
  },

  audio: {
    create: '/api/audio/create',
    upload: '/api/audio/upload',
  },
  answer: {
    update: '/api/answer',
  },
  question: {
    updateCorrectAnswers: '/api/question/correct-answer',
    updatePhotos: '/api/question/photos',
    updateAudios: '/api/question/audios',
    createQuestionAudio: '/api/question/question-audio',
    createQuestionPhoto: '/api/question/question-photo',
    getByGroupId: '/api/question/get-by-group-id/:groupId',
    updateMany: '/api/question/update-many',
  },
  questionGroup: {
    update: '/api/question-group',
    getAll: '/api/question-group/all/:partId',
  },
};

export default urls;
