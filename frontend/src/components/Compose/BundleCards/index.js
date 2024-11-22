import { ListGroup } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './BundleCards.module.scss';
import BundleCard from '../BundleCard';

const cx = classNames.bind(styles);

const BundleCards = ({ data }) => {
  return (
    <ListGroup className={cx('container')} horizontal>
      {data.map((bundle, index) => (
        <BundleCard key={bundle.id} data={bundle} index={index} />
      ))}
    </ListGroup>
  );
};

export default BundleCards;
