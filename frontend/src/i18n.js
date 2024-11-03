import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import languagedetector from 'i18next-browser-languagedetector';

i18n
  .use( Backend )
  .use( languagedetector )
  .use( initReactI18next )
  .init( {
    fallbackLng: 'vi',
    debug: true,
    detection: {
      order: [ 'localStorage', 'cookie', 'navigator', 'htmlTag', 'path', 'subdomain' ],
      caches: ['localStorage']
    },
    interpolation: {
      excapeValue: false,
    }
  } );

export default i18n;