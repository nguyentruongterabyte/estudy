import config from "~/config";

const navigationItems = {
  admin: [
    {
      title: 'Tạo tài khoản Editor',
      href: '/create-editor-account',
    },
  ],
  editor: [
    {
      title: 'Soạn đề R&L',
      // href: '/compose/compose-reading-listening',
      dropdownItems: [
        {
          title: 'Phần 1: Mô tả tranh',
          href: config.routes.compose.part1_Photos,
        },
        {
          title: 'Phần 2: Hỏi đáp',
          href: config.routes.compose.part2_QuestionResponse,
        },
        {
          title: 'Phần 3: Đoạn hội thoại',
          href: config.routes.compose.part3_Conversations,
        },
        {
          title: 'Phần 4: Bài nói ngắn',
          href: config.routes.compose.part4_ShortTalks,
        },
        {
          title: 'Phần 5: Hoàn thành câu',
          href: config.routes.compose.part5_IncompleteSentences,
        },
        {
          title: 'Phần 6: Hoàn thành đoạn văn',
          href: config.routes.compose.part6_TextCompletion,
        },
        {
          title: 'Phần 7: Đọc hiểu - đoạn đơn',
          href: config.routes.compose.part7_SinglePassages,
        },
        {
          title: 'Phần 7: Đọc hiểu - đoạn kép',
          href: config.routes.compose.part7_DoublePassages,
        },
        {
          title: 'Phần 7: Đọc hiểu - đoạn ba',
          href: config.routes.compose.part7_TriplePassages,
        },
      ],
    },
  ],
  user: [
    {
      title: 'Luyện R&L',
      href: '/practice/practice-reading-listening',
      dropdownItems: [
        {
          title: 'Phần 1: Mô tả tranh',
          href: '/practice/part-1-photos',
        },
        {
          title: 'Phần 2: Hỏi đáp',
          href: '/practice/part-2-question-response',
        },
        {
          title: 'Phần 3: Đoạn hội thoại',
          href: '/practice/part-3-conversations',
        },
        {
          title: 'Phần 4: Bài nói ngắn',
          href: '/practice/part-4-short-talks',
        },
        {
          title: 'Phần 5: Hoàn thành câu',
          href: '/practice/part-5-incomplete-sentences',
        },
        {
          title: 'Phần 6: Hoàn thành đoạn văn',
          href: '/practice/part-6-text-completion',
        },
        {
          title: 'Phần 7: Đọc hiểu - đoạn đơn',
          href: '/practice/part-7-single-passages',
        },
        {
          title: 'Phần 7: Đọc hiểu - đoạn kép',
          href: '/practice/part-7-double-passages',
        },
        {
          title: 'Phần 7: Đọc hiểu - đoạn ba',
          href: '/practice/part-7-triple-passages',
        },
      ],
    },
    {
      title: 'Luyện S&W',
      href: '/practice/practice-speaking-writing',
    },
    {
      title: 'Đề thi thử',
      href: 'test',
      dropdownItems: [
        {
          title: 'Thi mô phỏng',
          href: '/test/simulation-test',
        },
        {
          title: 'Full test',
          href: '/test/full-test',
        },
        {
          title: 'Mini test',
          href: '/test/minitest',
        },
      ],
    },
    {
      title: 'Ngữ pháp',
      href: '/practice/grammar',
    },
    {
      title: 'Từ vựng',
      href: '/practice/vocabulary',
    },
  ],
};

export default navigationItems;
