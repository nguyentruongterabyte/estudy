import classNames from 'classnames/bind';
import styles from './FlipCard.module.scss';
import React, { Fragment, useState, cloneElement } from 'react';

const cx = classNames.bind(styles);

const FlipCard = ({ frontChildrend, backChildren, className, headerContent = <Fragment /> }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div className={cx('container', className, { flipped: isFlipped })} onClick={handleFlip}>
      <div className={cx('header')}>{headerContent}</div>
      <div className={cx('inner')}>
        <div className={cx('front')}>{frontChildrend}</div>
        <div className={cx('back')}>{backChildren}</div>
      </div>
    </div>
  );
};

export default FlipCard;
