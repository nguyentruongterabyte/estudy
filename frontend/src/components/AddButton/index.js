import { Button } from 'react-bootstrap';
import classNames from 'classnames/bind';

import styles from './AddButton.module.scss';

const cx = classNames.bind(styles);

const AddButton = ({ onClick, children, className }) => {
  return (
    <Button variant="outline-success" className={cx('container', className)} onClick={onClick}>
      {children}
    </Button>
  );
};

export default AddButton;
