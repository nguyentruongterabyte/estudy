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

  vocabulary: {
    compose: '/vocabulary/compose',
    practice: '/vocabulary/practice',
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

  practice: {
    part1_Photos: '/practice/part-1-photos',
    part2_QuestionResponse: '/practice/part-2-question-response',
    part3_Conversations: '/practice/part-3-conversations',
    part4_ShortTalks: '/practice/part-4-short-talks',
    part5_IncompleteSentences: '/practice/part-5-incomplete-sentences',
    part6_TextCompletion: '/practice/part-6-text-completion',
    part7_SinglePassages: '/practice/part-7-single-passages',
    part7_DoublePassages: '/practice/part-7-double-passages',
    part7_TriplePassages: '/practice/part-7-triple-passages',
  },
};

export default routes;
