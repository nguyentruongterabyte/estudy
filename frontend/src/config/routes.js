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

  grammar: {
    compose: '/grammar/compose',
    practice: '/grammar/practice',
  },

  test: {
    compose: {
      part1_Photos: '/test/compose/part-1-photos',
      part2_QuestionResponse: '/test/compose/part-2-question-response',
      part3_Conversations: '/test/compose/part-3-conversations',
      part4_ShortTalks: '/test/compose/part-4-short-talks',
      part5_IncompleteSentences: '/test/compose/part-5-incomplete-sentences',
      part6_TextCompletion: '/test/compose/part-6-text-completion',
      part7_SinglePassages: '/test/compose/part-7-single-passages',
      part7_DoublePassages: '/test/compose/part-7-double-passages',
      part7_TriplePassages: '/test/compose/part-7-triple-passages',
    },

    practice: {
      part1_Photos: '/test/practice/part-1-photos',
      part2_QuestionResponse: '/test/practice/part-2-question-response',
      part3_Conversations: '/test/practice/part-3-conversations',
      part4_ShortTalks: '/test/practice/part-4-short-talks',
      part5_IncompleteSentences: '/test/practice/part-5-incomplete-sentences',
      part6_TextCompletion: '/test/practice/part-6-text-completion',
      part7_SinglePassages: '/test/practice/part-7-single-passages',
      part7_DoublePassages: '/test/practice/part-7-double-passages',
      part7_TriplePassages: '/test/practice/part-7-triple-passages',
    },
  },
};

export default routes;
