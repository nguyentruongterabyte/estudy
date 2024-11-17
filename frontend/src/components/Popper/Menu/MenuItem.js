import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './MenuItem.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const MenuItem = ({ data, onClick }) => {
  const { t } = useTranslation();

  return (
    <div className={cx('container')}>
      <Button
        className={cx('button', {
          separate: data.separate,
        })}
        to={data.to}
        leftIcon={data.icon}
        onClick={onClick}
      >
        {t(data.title)}
      </Button>
    </div>
  );
};

export default MenuItem;
