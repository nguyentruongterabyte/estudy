import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './MenuItem.module.scss';
import Button from '~/components/Button';
import { Image } from 'react-bootstrap';

const cx = classNames.bind(styles);

const MenuItem = ({ data, onClick }) => {
  const { t } = useTranslation();

  return (
    <div className={cx('container')} onClick={onClick}>
      <Button
        className={cx('button', {
          separate: data.separate,
        })}
        to={data.to}
        leftIcon={data.icon}
      >
        {t(data.title)}
      </Button>
      {data.image && <Image className={cx('image')} width={32} height={19} src={data.image} />}
    </div>
  );
};

export default MenuItem;
