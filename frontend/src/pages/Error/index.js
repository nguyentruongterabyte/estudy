import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './Error.module.scss';
import Button from '~/components/Button';
import config from '~/config';

const cx = classNames.bind( styles );


const Error = ( {
  errorCode = 404,
  message,
  goBackTitle
} ) => {
  const navigate = useNavigate();
  const errorCodeStr = errorCode.toString();

  return (
    <div className={cx('wrapper')}>
      <div className={cx('error')}>
        <div className={cx('error-block')}>
          <h1>
            {errorCodeStr[0]}
            <span>{errorCodeStr[1]}</span>
            {errorCodeStr[2]}
          </h1>
        </div>
        <p>{message}</p>
        <Button outline onClick={() => navigate(-1, { replace: true })}>
          {goBackTitle}
        </Button>
      </div>
    </div>
  );
}

export default Error;