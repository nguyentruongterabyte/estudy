const urls = {
  user: {
    refreshToken: '/api/user/refresh',
    register: '/api/user/register',
    login: '/api/user/login',
    logout: '/api/user/logout',
  },
  test: {
    create: '/api/test/create',
  },
  photo: {
    upload: '/api/photo/upload',
  },

  audio: {
    create: '/api/audio/create', // (1)
    upload: '/api/audio/upload', // (6)
  },
  answer: {
    update: '/api/answer',
  },
  question: {
    updateCorrectAnswers: '/api/question/correct-answer',
    updatePhotos: '/api/question/photos',
    updateAudios: '/api/question/audios',
    createQuestionAudio: '/api/question/question-audio', // (2)
    createQuestionPhoto: '/api/question/question-photo', // (3)
    getByGroupId: '/api/question/get-by-group-id', // (5)
  },
  questionGroup: {
    update: '/api/question-group',
    getAll: '/api/question-group/all', // (4)
  },
};

export default urls;
