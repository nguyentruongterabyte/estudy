import React from 'react';
import { useTranslation } from 'react-i18next';
import images from '~/assets/images';
import classNames from 'classnames/bind';
import styles from '../HomeHasLogged.module.scss';

const cx = classNames.bind(styles);

export const About = (props) => {
  const { t } = useTranslation();
  return (
    <div id="about" className={cx('about')}>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <img className={cx('img', 'img-responsive')} src={images.about} alt="about" />{' '}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>{t('aboutUs')}</h2>
              <p>{props.data ? t(props.data.paragraph) : 'loading...'}</p>
              <h3>{t('whyChooseUs')}</h3>
              <div className="list-style row">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>{props.data ? props.data.Why.map((d, i) => <li key={`${d}-${i}`}>{t(d)}</li>) : 'loading'}</ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>{props.data ? props.data.Why2.map((d, i) => <li key={`${d}-${i}`}> {t(d)}</li>) : 'loading'}</ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
