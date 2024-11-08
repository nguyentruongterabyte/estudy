import { useTranslation } from 'react-i18next';
import { Image } from 'react-bootstrap';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';

import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import styles from './HomeLayout.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const ProfileMenu = ({ profileMenu, handleMenuChange }) => {
  const { t } = useTranslation();
  return (
    <Menu items={profileMenu} hideOnClick={true} onChange={handleMenuChange}>
      <div>
        <Tippy delay={[0, 50]} placement="bottom" content={t('account')}>
          <Image
            src={images.userImage}
            className={cx('user-avatar', 'hide-on-mobile-tablet')}
            alt="user-avatar"
          />
        </Tippy>
        <Button outline className={cx('account-btn', 'hide-on-pc')}>
          {t('account')}
        </Button>
      </div>
    </Menu>
  );
};

export default ProfileMenu;
