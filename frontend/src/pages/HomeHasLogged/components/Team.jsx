import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';
import styles from '../HomeHasLogged.module.scss';

const cx = classNames.bind(styles);

export const Team = (props) => {
  const { t } = useTranslation();
  return (
    <div id="team" className={cx('text-center', 'team')}>
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>{t('meetTheTeam')}</h2>
        </div>
        <div id="row" className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-3 col-sm-6 team">
                  <div className="thumbnail">
                    <img className={cx('img', 'team-img')} src={d.img} alt="..." />
                    <div className="caption">
                      <h4>{t(d.name)}</h4>
                      <p>{t(d.job)}</p>
                    </div>
                  </div>
                </div>
              ))
            : 'loading'}
        </div>
      </div>
    </div>
  );
};
