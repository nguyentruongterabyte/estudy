import routes from './routes';

const navigationItems = {
  admin: [
    {
      title: 'createEditorAccount',
      href: routes.createEditorAccount,
    },
    {
      title: 'manageAccount',
      href: routes.accountManager,
    },
  ],
  editor: [
    {
      title: 'composeRL',
      dropdownItems: [
        {
          title: 'part1_Photos',
          href: routes.test.compose.part1_Photos,
        },
        {
          title: 'part2_QuestionResponse',
          href: routes.test.compose.part2_QuestionResponse,
        },
        {
          title: 'part3_Conversations',
          href: routes.test.compose.part3_Conversations,
        },
        {
          title: 'part4_ShortTalks',
          href: routes.test.compose.part4_ShortTalks,
        },
        {
          title: 'part5_IncompleteSentences',
          href: routes.test.compose.part5_IncompleteSentences,
        },
        {
          title: 'part6_TextCompletion',
          href: routes.test.compose.part6_TextCompletion,
        },
        {
          title: 'part7_SinglePassages',
          href: routes.test.compose.part7_SinglePassages,
        },
        {
          title: 'part7_DoublePassages',
          href: routes.test.compose.part7_DoublePassages,
        },
        {
          title: 'part7_TriplePassages',
          href: routes.test.compose.part7_TriplePassages,
        },
      ],
    },
    {
      title: 'grammar',
      href: routes.grammar.compose,
    },
    {
      title: 'vocabulary',
      href: routes.vocabulary.compose,
    },
  ],
  user: [
    {
      title: 'practiceRL',
      dropdownItems: [
        {
          title: 'part1_Photos',
          href: routes.test.practice.part1_Photos,
        },
        {
          title: 'part2_QuestionResponse',
          href: routes.test.practice.part2_QuestionResponse,
        },
        {
          title: 'part3_Conversations',
          href: routes.test.practice.part3_Conversations,
        },
        {
          title: 'part4_ShortTalks',
          href: routes.test.practice.part4_ShortTalks,
        },
        {
          title: 'part5_IncompleteSentences',
          href: routes.test.practice.part5_IncompleteSentences,
        },
        {
          title: 'part6_TextCompletion',
          href: routes.test.practice.part6_TextCompletion,
        },
        {
          title: 'part7_SinglePassages',
          href: routes.test.practice.part7_SinglePassages,
        },
        {
          title: 'part7_DoublePassages',
          href: routes.test.practice.part7_DoublePassages,
        },
        {
          title: 'part7_TriplePassages',
          href: routes.test.practice.part7_TriplePassages,
        },
      ],
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
      href: routes.grammar.practice,
    },
    {
      title: 'vocabulary',
      href: routes.vocabulary.practice,
    },
  ],
};

export default navigationItems;
