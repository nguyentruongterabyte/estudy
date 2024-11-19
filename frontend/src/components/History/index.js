import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Menu from '../Popper/Menu';
import styles from './History.module.scss';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

const History = ({ className, items, onItemClick }) => {
  const { t } = useTranslation();
  return (
    <Menu className={cx('container', className)} items={items} hideOnClick={true} onChange={onItemClick}>
      <Tippy delay={[0, 50]} placement="bottom" content={t('historyChanges')}>
        <FontAwesomeIcon className={cx('icon')} icon={faClockRotateLeft} />
      </Tippy>
    </Menu>
  );
};

export default History;
