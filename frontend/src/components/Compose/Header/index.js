import { faArrowRight, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './Header.module.scss';
import Button from '~/components/Button';
const cx = classNames.bind(styles);

const Header = ({
  isEdit,
  isAddNew,
  className,
  setShow,
  show,
  onCancel,
  onComplete,
  isComplete,
  title = 'part1_Photos',
}) => {
  const { t } = useTranslation();
  const handleToggleCanvas = () => {
    setShow((prev) => !prev);
  };

  return (
    <div className={cx('container', className)}>
      <div className={cx('group')}>
        <FontAwesomeIcon
          className={cx('canvas-button')}
          icon={show ? faBars : faArrowRight}
          onClick={handleToggleCanvas}
        />
        <h1>{title && t(title)}</h1>
      </div>
      {/* Cancel/complete button */}
      {(isAddNew || isEdit) && (
        <div className={cx('button-group')}>
          <Button onClick={onCancel} className={cx('cancel-button')} outline>
            {t('cancel')}
          </Button>
          <Button success={isComplete} onClick={onComplete} disabled={!isComplete} className={cx('complete-button')}>
            {t('complete')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
