import { faAddressCard, faLock, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const profileMenuItems = [
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
];

export default profileMenuItems;
