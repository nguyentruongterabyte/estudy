import React from 'react';
import { useTranslation } from 'react-i18next';

export const Testimonials = (props) => {
  const { t } = useTranslation();
  return (
    <div id="testimonials">
      <div className="container">
        <div className="section-title text-center">
          <h2>{t('whatOurClientsSay')}</h2>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-4">
                  <div className="testimonial">
                    <div className="testimonial-image">
                      <img src={d.img} alt="" />
                    </div>
                    <div className="testimonial-content">
                      <p>"{t(d.text)}"</p>
                      <div className="testimonial-meta"> - {t(d.name)} </div>
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
