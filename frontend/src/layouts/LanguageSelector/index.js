import Tippy from '@tippyjs/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import languagesData from '~/config/languages.json';
import { Image } from 'react-bootstrap';
import classNames from 'classnames/bind';

import Menu from '~/components/Popper/Menu';
import styles from './LanguageSelector.module.scss';

const cx = classNames.bind(styles);

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const [languageImage, setLanguageImage] = useState(languagesData[0].image);

  useEffect(() => {
    const languageCode = localStorage.getItem('i18nextLng');
    if (languageCode) {
      const localLanguage = languagesData.find((lang) => lang.code === languageCode);
      if (localLanguage) setLanguageImage(localLanguage.image);
    } else {
      localStorage.setItem('i18nextLng', 'en');
    }
  }, []);

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language.code);
    setLanguageImage(language.image);
  };

  return (
    <Menu items={languagesData} hideOnClick={true} onChange={handleLanguageChange}>
      <span>
        <Tippy delay={[0, 50]} content={t('change_language')} placement="bottom">
          <Image src={languageImage} className={cx('language-image', 'hide-on-mobile-tablet')} alt="language" />
        </Tippy>
      </span>
    </Menu>
  );
};

export default LanguageSelector;
