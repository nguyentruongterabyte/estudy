import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './Menu.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const MenuItem = ({ data, onClick }) => {
  const { t } = useTranslation();
  const classes = cx('menu-item', {
    separate: data.separate,
  });

  return (
    <Button className={classes} to={data.to} leftIcon={data.icon} onClick={onClick}>
      {t(data.title)}
    </Button>
  );
};

export default MenuItem;
