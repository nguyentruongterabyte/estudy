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
      title: 'vocabulary',
      href: routes.vocabulary.compose,
    },
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
      dropdownItems: [
        {
          title: 'part1_Photos',
          href: routes.practice.part1_Photos,
        },
        {
          title: 'part2_QuestionResponse',
          href: routes.practice.part2_QuestionResponse,
        },
        {
          title: 'part3_Conversations',
          href: routes.practice.part3_Conversations,
        },
        {
          title: 'part4_ShortTalks',
          href: routes.practice.part4_ShortTalks,
        },
        {
          title: 'part5_IncompleteSentences',
          href: routes.practice.part5_IncompleteSentences,
        },
        {
          title: 'part6_TextCompletion',
          href: routes.practice.part6_TextCompletion,
        },
        {
          title: 'part7_SinglePassages',
          href: routes.practice.part7_SinglePassages,
        },
        {
          title: 'part7_DoublePassages',
          href: routes.practice.part7_DoublePassages,
        },
        {
          title: 'part7_TriplePassages',
          href: routes.practice.part7_TriplePassages,
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
      href: '/practice/grammar',
    },
    {
      title: 'vocabulary',
      href: routes.vocabulary.practice,
    },
  ],
};

export default navigationItems;
