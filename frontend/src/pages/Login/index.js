import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './Login.module.scss';
import axios from '~/utils/axios';
import Button from '~/components/Button';
import config from '~/config';
import hooks from '~/hooks';

const cx = classNames.bind(styles);

const Login = () => {
  const { t } = useTranslation();
  const { setAuth } = hooks.useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || config.routes.home;

  const emailRef = useRef();
  const errRef = useRef();

  const [email, resetEmail, emailAttribs] = hooks.useInput('email', '');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [check, toggleCheck] = hooks.useToggle('persist', false);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(config.urls.user.login, JSON.stringify({ email, password }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.data?.accessToken;
      const roles = response?.data?.data?.user?.roles;
      const firstName = response?.data?.data?.user?.firstName;
      const lastName = response?.data?.data?.user?.lastName;
      const phoneNumber = response?.data?.data?.user?.phoneNumber;

      setAuth({ email, firstName, lastName, phoneNumber, roles, accessToken });
      resetEmail();
      setPassword('');
      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        setErrMsg(t('no_response'));
      } else if (error?.response?.status === 400) {
        setErrMsg(t('missing_email_password'));
      } else if (error?.response?.status === 401) {
        setErrMsg(t('invalid_credentials'));
      } else {
        setErrMsg(t('login_failed'));
      }
    }
  };

  return (
    <section className={cx('wrapper')}>
      <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
        {errMsg}
      </p>
      <h1>{t('sign_in')}</h1>
      <form onSubmit={handleSubmit} className={cx('form')}>
        <label htmlFor="email">{t('email')}</label>
        <input
          type="email"
          id="email"
          ref={emailRef}
          spellCheck="false"
          autoComplete="off"
          {...emailAttribs}
          required
        />

        <label htmlFor="password">{t('password')}</label>
        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
        <Button className={cx('login-btn')}>{t('sign_in')}</Button>
        <div className={cx('persistCheck')}>
          <input type="checkbox" id="persist" onChange={toggleCheck} checked={check} />
          <label htmlFor="persist">{t('trust_this_device')}</label>
        </div>
      </form>
      <p className={cx('need-account')}>
        {t('need_account')}
        <br />
        <span className="line">
          {/*put router link here*/}
          <Link to={config.routes.register}>{t('sign_up')}</Link>
        </span>
      </p>
    </section>
  );
};

export default Login;
