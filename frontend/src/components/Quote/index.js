import classNames from 'classnames/bind';
import styles from './Quote.module.scss';
import images from '~/assets/images';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

const Quote = ({ quote = 'nothingIsMorePreciousThanIndependenceAndFreedom', className }) => {
  const { t } = useTranslation();
  return (
    <div className={cx('container', [className])}>
      <img className={cx('image')} src={images.note} />
      <h1 className={cx('text')}>{t(quote)}</h1>
    </div>
  );
};

export default Quote;
