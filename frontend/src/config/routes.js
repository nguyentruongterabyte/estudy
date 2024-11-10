const routes = {
  login: '/login',
  register: '/register',
  unauthorized: '/unauthorized',
  home: {
    user: '/home/user',
    editor: '/home/editor',
    admin: '/home/admin',
    default: '/',
  },

  compose: {
    part1_Photos: '/compose/part-1-photos',
    part2_QuestionResponse: '/compose/part-2-question-response',
    part3_Conversations: '/compose/part-3-conversations',
    part4_ShortTalks: '/compose/part-4-short-talks',
    part5_IncompleteSentences: '/compose/part-5-incomplete-sentences',
    part6_TextCompletion: '/compose/part-6-text-completion',
    part7_SinglePassages: '/compose/part-7-single-passages',
    part7_DoublePassages: '/compose/part-7-double-passages',
    part7_TriplePassages: '/compose/part-7-triple-passages',
  },
};

export default routes;