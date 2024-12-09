import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import axios from '~/utils/axios';
import Button from '~/components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { faCheck, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './Login/Login.module.scss';
import config from '~/config';
import hooks from '~/hooks';

const cx = classNames.bind(styles);

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

function EditorAccountCreation() {
  const { t } = useTranslation();
  const errRef = useRef();
  const userRef = useRef();

  const [email, resetEmail, emailAttribs] = hooks.useInput('email', '');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const axiosPrivate = hooks.useAxiosPrivate();

  const from = config.routes.login;
  const navigate = useNavigate();
  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if button enabled with JS hack
    const v1 = PWD_REGEX.test(pwd);
    const v2 = EMAIL_REGEX.test(email);
    if (!v1 || !v2) {
      setErrMsg('Đầu vào không hợp lệ!');
      return;
    }
    try {
      await axiosPrivate.post(config.urls.user.createEditor, JSON.stringify({ password: pwd, email }));
      setSuccess(true);
      resetEmail();
      setPwd('');
      setMatchPwd('');
      // toast.success(response?.data?.message);
      navigate(config.routes.accountManager, { replace: true });
    } catch (error) {
      if (!error?.response) {
        setErrMsg(t('no_response'));
      } else if (error?.response?.status === 409) {
        setErrMsg(t('email_taken'));
      } else {
        setErrMsg('Đăng ký thất bại!');
      }
      errRef.current?.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to={config.routes.login}>{t('sign_in')}</Link>
          </p>
        </section>
      ) : (
        <section className={cx('wrapper')}>
          <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
            {errMsg}
          </p>
          <h1>{t('createEditorAccount')}</h1>
          <form onSubmit={handleSubmit} className={cx('form')}>
            <label htmlFor="email">
              {t('email')}
              <FontAwesomeIcon icon={faCheck} className={validEmail ? 'valid' : 'hide'} />
              <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? 'hide' : 'invalid'} />
            </label>
            <input
              type="email"
              id="email"
              {...emailAttribs}
              required
              aria-invalid={validEmail ? 'false' : 'true'}
              aria-describedby="emailnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p id="emailnote" className={emailFocus && email && !validEmail ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              <span dangerouslySetInnerHTML={{ __html: t('valid_email_format') }}></span>
            </p>

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
            <Button className={cx('login-btn')} disabled={!validEmail || !validPwd || !validMatch}>
              {t('sign_up')}
            </Button>
          </form>
        </section>
      )}
    </>
  );
}

export default EditorAccountCreation;
