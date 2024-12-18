import classNames from 'classnames/bind';
import styles from '../Login/Login.module.scss';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import hooks from '~/hooks';

const cx = classNames.bind(styles);

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ChangePasswordForm = ({ email = '', OTP = '' }) => {
  const { t } = useTranslation();
  const errRef = useRef();
  const { resetPassword } = hooks.useUserService();

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  const from = config.routes.login;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(OTP, email, pwd);
    // if button enabled with JS hack
    const v1 = PWD_REGEX.test(pwd);
    if (!v1) {
      setErrMsg(t('invalidInput'));
      return;
    }
    try {
      const data = await resetPassword(OTP, email, pwd);
      if (data.errCode !== 0) {
        window.location.reload();
      }
      setPwd('');
      setMatchPwd('');
      localStorage.setItem('email', JSON.stringify(email));
      // toast.success(response?.data?.message);
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      errRef.current?.focus();
    }
  };

  useEffect(() => {
    setErrMsg('');
  }, [pwd, matchPwd]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  return (
    <section className={cx('wrapper')}>
      <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
        {errMsg}
      </p>
      <h1>{t('passwordRecovery')}</h1>
      <form onSubmit={handleSubmit} className={cx('form')}>
        <label htmlFor="password">
          {t('password')}
          <FontAwesomeIcon icon={faCheck} className={validPwd ? 'valid' : 'hide'} />
          <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? 'hide' : 'invalid'} />
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          aria-invalid={validPwd ? 'false' : 'true'}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <p id="pwdnote" className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
          <FontAwesomeIcon icon={faInfoCircle} />
          <span dangerouslySetInnerHTML={{ __html: t('password_requirements') }}></span>
        </p>

        <label htmlFor="confirm-pwd">
          {t('password_confimation')}
          <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? 'valid' : 'hide'} />
          <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? 'hide' : 'invalid'} />
        </label>
        <input
          type="password"
          id="confirm-pwd"
          onChange={(e) => setMatchPwd(e.target.value)}
          value={matchPwd}
          required
          aria-invalid={validMatch ? 'false' : 'true'}
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p id="confirmnote" className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
          <FontAwesomeIcon icon={faInfoCircle} />
          {t('password_must_match')}
        </p>
        <Button className={cx('login-btn')} disabled={!validPwd || !validMatch}>
          {t('passwordRecovery')}
        </Button>
      </form>
    </section>
  );
};

export default ChangePasswordForm;
