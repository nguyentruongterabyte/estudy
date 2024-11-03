import icons from '~/assets/icons';

const accountMenuItems = [
  {
    icon: icons.faEarthAsia,
    title: 'Language',
    children: {
      title: 'Ngôn ngữ',
      data: [
        {
          title: 'English',
          type: 'language',
          code: 'en',
          separate: true,
        },
        {
          title: 'Tiếng Việt',
          type: 'language',
          code: 'vi',
        },
      ],
    },
  },
  {
    icon: icons.faKeyboard,
    title: 'Phím tắt'
  },
  {
    icon: icons.faAddressCard,
    title: 'Hồ sơ của tôi',
    type: 'viewProfile',
  }, 
  {
    icon: icons.faCircleQuestion,
    title: 'Phản hồi và trợ giúp',
    to: '/feedback',
  },
  {
    icon: icons.faRightFromBracket,
    title: 'Đăng xuất',
    type: 'logout'
  }
];

export default accountMenuItems;