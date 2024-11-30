import classNames from 'classnames/bind';

import styles from './CustomCarousel.module.scss';
import { Carousel } from 'react-bootstrap';

const cx = classNames.bind(styles);

const CustomCarousel = ({ items = [], className, ...props }) => {
  const renderItems = () => {
    return items.map((carouselItem, index) => (
      <Carousel.Item key={index}>
        <div className={cx('item')}>{carouselItem}</div>
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
