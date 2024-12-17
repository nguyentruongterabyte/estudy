import { faAddressCard, faChartLine, faLock, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const profileMenuItems = {
  user: [
    {
      icon: faChartLine,
      title: 'learningResult',
      type: 'learningResult',
    },
    {
      icon: faAddressCard,
      title: 'view_profile',
      type: 'viewProfile',
    },
    {
      icon: faLock,
      title: 'changePassword',
      type: 'changePassword',
    },
    {
      icon: faRightFromBracket,
      title: 'logout',
      type: 'logout',
      separate: true,
    },
  ],
  admin: [
    {
      icon: faAddressCard,
      title: 'view_profile',
      type: 'viewProfile',
    },
    {
      icon: faLock,
      title: 'changePassword',
      type: 'changePassword',
    },
    {
      icon: faRightFromBracket,
      title: 'logout',
      type: 'logout',
      separate: true,
    },
  ],
  editor: [
    {
      icon: faAddressCard,
      title: 'view_profile',
      type: 'viewProfile',
    },
    {
      icon: faLock,
      title: 'changePassword',
      type: 'changePassword',
    },
    {
      icon: faRightFromBracket,
      title: 'logout',
      type: 'logout',
      separate: true,
    },
  ],
};

export default profileMenuItems;
