import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from '../HomeHasLogged.module.scss';

const cx = classNames.bind(styles);

export const Features = (props) => {
  const { t } = useTranslation();
  return (
    <div id="features" className={cx('text-center', 'features')}>
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>{t('features')}</h2>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.title}-${i}`} className="col-xs-6 col-md-3">
                  <h3>{t(d.title)}</h3>
                  <p>{t(d.text)}</p>
                </div>
              ))
            : 'Loading...'}
        </div>
      </div>
    </div>
  );
};
