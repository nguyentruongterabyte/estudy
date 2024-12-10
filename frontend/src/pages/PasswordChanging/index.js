import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from '~/pages/Login/Login.module.scss';
import Button from '~/components/Button';
import hooks from '~/hooks';
import { faCheck, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import config from '~/config';
import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const PasswordChanging = () => {
  const { t } = useTranslation();
  const errRef = useRef();

  const [matchPwd, setMatchPwd] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const axiosPrivate = hooks.useAxiosPrivate();
  const id = hooks.useUserId() || -1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id !== -1) {
        await toast.promise(axiosPrivate.put(`${config.urls.user.updatePassword}/${id}`, { password, newPassword }), {
          pending: t('processingChangePassword'),
          success: t('changePasswordSuccess'),
          error: t('changePasswordFailed'),
        });
      }
    } catch (error) {
      if (!error?.response) {
        setErrMsg(t('no_response'));
      } else if (error?.response?.status === 400) {
        setErrMsg(t('incorrectOldPassword'));
      } else {
        setErrMsg(t('serverError'));
      }
    }
  };

  useEffect(() => {
    const result = PWD_REGEX.test(newPassword);
    setValidPwd(result);
    const match = newPassword === matchPwd;
    setValidMatch(match);
  }, [newPassword, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [password, newPassword, matchPwd]);

  return (
    <section className={cx('wrapper')}>
      <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
        {errMsg}
      </p>
      <h1>{t('changePassword')}</h1>
      <form onSubmit={handleSubmit} className={cx('form')}>
        <label htmlFor="old-password">{t('oldPassword')}</label>
        <input
          className={cx('input')}
          type="password"
          id="old-password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <label htmlFor="password">
          {t('password')}
          <FontAwesomeIcon icon={faCheck} className={validPwd ? 'valid' : 'hide'} />
          <FontAwesomeIcon icon={faTimes} className={validPwd || !newPassword ? 'hide' : 'invalid'} />
        </label>
        <input
          type="password"
          id="new-password"
          className={cx('input')}
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
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
          className={cx('input')}
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
        <Button disabled={!(validMatch || (validPwd && matchPwd === newPassword))} className={cx('login-btn')}>
          {t('changePassword')}
        </Button>
      </form>
      <ToastContainer />
    </section>
  );
};

export default PasswordChanging;
