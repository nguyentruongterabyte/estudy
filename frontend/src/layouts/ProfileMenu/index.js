import { useTranslation } from 'react-i18next';
import { Image } from 'react-bootstrap';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';

import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import styles from './ProfileMenu.module.scss';
import images from '~/assets/images';
import hooks from '~/hooks';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const ProfileMenu = ({ items, handleMenuChange }) => {
  const { t } = useTranslation();

  const id = hooks.useUserId() || -1;
  const { getUserById } = hooks.useUserService();
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const fetchUserInfo = async (id) => {
      const user = await getUserById(id);
      return user;
    };

    if (id !== -1) {
      fetchUserInfo(id)
        .then((user) => {
          setAvatar(user.photo);
        })
        .catch((e) => console.error(e));
    }
    // eslint-disable-next-line
  }, [id]);

  return (
    <Menu items={items} hideOnClick={true} onChange={handleMenuChange}>
      <div>
        <Tippy delay={[0, 50]} placement="bottom" content={t('account')}>
          <Image
            src={avatar ? avatar : images.userImage}
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
