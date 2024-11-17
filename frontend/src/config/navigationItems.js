
import routes from './routes';

const navigationItems = {
  admin: [
    {
      title: 'createEditorAccount',
      href: '/create-editor-account',
    },
  ],
  editor: [
    {
      title: 'composeRL',
      // href: '/compose/compose-reading-listening',
      dropdownItems: [
        {
          title: 'part1_Photos',
          href: routes.compose.part1_Photos,
        },
        {
          title: 'part2_QuestionResponse',
          href: routes.compose.part2_QuestionResponse,
        },
        {
          title: 'part3_Conversations',
          href: routes.compose.part3_Conversations,
        },
        {
          title: 'part4_ShortTalks',
          href: routes.compose.part4_ShortTalks,
        },
        {
          title: 'part5_IncompleteSentences',
          href: routes.compose.part5_IncompleteSentences,
        },
        {
          title: 'part6_TextCompletion',
          href: routes.compose.part6_TextCompletion,
        },
        {
          title: 'part7_SinglePassages',
          href: routes.compose.part7_SinglePassages,
        },
        {
          title: 'part7_DoublePassages',
          href: routes.compose.part7_DoublePassages,
        },
        {
          title: 'part7_TriplePassages',
          href: routes.compose.part7_TriplePassages,
        },
      ],
    },
  ],
  user: [
    {
      title: 'practiceRL',
      href: '/practice/practice-reading-listening',
      dropdownItems: [
        {
          title: 'part1_Photos',
          href: '/practice/part-1-photos',
        },
        {
          title: 'part2_QuestionResponse',
          href: '/practice/part-2-question-response',
        },
        {
          title: 'part3_Conversations',
          href: '/practice/part-3-conversations',
        },
        {
          title: 'part4_ShortTalks',
          href: '/practice/part-4-short-talks',
        },
        {
          title: 'part5_IncompleteSentences',
          href: '/practice/part-5-incomplete-sentences',
        },
        {
          title: 'part6_TextCompletion',
          href: '/practice/part-6-text-completion',
        },
        {
          title: 'part7_SinglePassages',
          href: '/practice/part-7-single-passages',
        },
        {
          title: 'part7_DoublePassages',
          href: '/practice/part-7-double-passages',
        },
        {
          title: 'part7_TriplePassages',
          href: '/practice/part-7-triple-passages',
        },
      ],
    },
    {
      title: 'practiceSW',
      href: '/practice/practice-speaking-writing',
    },
    {
      title: 'mockTest',
      href: 'test',
      dropdownItems: [
        {
          title: 'simulationTest',
          href: '/test/simulation-test',
        },
        {
          title: 'fullTest',
          href: '/test/full-test',
        },
        {
          title: 'miniTest',
          href: '/test/minitest',
        },
      ],
    },
    {
      title: 'grammar',
      href: '/practice/grammar',
    },
    {
      title: 'vocabulary',
      href: '/practice/vocabulary',
    },
  ],
};

export default navigationItems;
