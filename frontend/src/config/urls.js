const urls = {
  user: {
    refreshToken: 'api/user/refresh',
    register: 'api/user/register',
    login: 'api/user/login',
    logout: 'api/user/logout',
  },
  test: {
    createAudio: 'api/test/create-audio',
    createQuestionAudio: 'api/test/question-audio',
    createQuestionPhoto: 'api/test/question-photo',
    create: 'api/test/create',
    questionGroups: 'api/test/question-groups',
    questions: 'api/test/questions',
    uploadAudio: 'api/test/upload-audio',
  },
  photo: {
    upload: 'api/photo/upload'
  },
  answer: {
    update: 'api/answer',
  },
  question: {
    updateCorrectAnswers: 'api/question/correct-answer',
    updatePhotos: 'api/question/photos'
  },
  questionGroup: {
    update: 'api/question-group',
  },
};

export default urls;
