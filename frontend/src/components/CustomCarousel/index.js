import classNames from 'classnames/bind';

import styles from './CustomCarousel.module.scss';
import { Carousel } from 'react-bootstrap';
import RenderIf from '../RenderIf';

const cx = classNames.bind(styles);

const CustomCarousel = ({ items = [], className, ...props }) => {
  const renderItems = () => {
    return items.map((carouselItem, index) => (
      <Carousel.Item key={index}>
        <div className={cx('item')}>{carouselItem.body}</div>
        <RenderIf isTrue={carouselItem.caption}>
          <Carousel.Caption className={cx('caption')}>
            <h1>{carouselItem.caption}</h1>
          </Carousel.Caption>
        </RenderIf>
      </Carousel.Item>
    ));
  };

  return (
    <Carousel className={cx('container', className)} {...props}>
      {renderItems()}
    </Carousel>
  );
};

export default CustomCarousel;
