import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { jwtDecode } from 'jwt-decode';

import styles from './Login.module.scss';
import axios from '~/utils/axios';
import Button from '~/components/Button';
import config from '~/config';
import hooks from '~/hooks';
import { Modal, Button as ButtonB } from 'react-bootstrap';

const cx = classNames.bind(styles);

const Login = () => {
  const { t } = useTranslation();
  const { setAuth } = hooks.useAuth();
  const navigate = useNavigate();

  const emailRef = useRef();
  const errRef = useRef();

  const [email, resetEmail, emailAttribs] = hooks.useInput('email', '');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const [showRoleModal, setShowRoleModal] = useState(false);
  const [userRoles, setUserRoles] = useState([]);

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
      const accessToken = response?.data?.data?.accessToken;
      const firstName = response?.data?.data?.user?.firstName;
      const lastName = response?.data?.data?.user?.lastName;
      const phoneNumber = response?.data?.data?.user?.phoneNumber;

      const roles = accessToken ? jwtDecode(accessToken).userInfo.roles : [];

      setAuth({ email, firstName, lastName, phoneNumber, roles, accessToken });

      if (roles.length > 1) {
        setUserRoles(roles);
        setShowRoleModal(true); // display modal
      } else {
        const roleName = Object.keys(config.roles).find((key) => config.roles[key] === roles[0]);
        navigate(`/home/${roleName}`, { replace: true });
        setAuth((prev) => ({ ...prev, currentRole: roles[0] }));
        localStorage.setItem('currentRole', roles[0]);
        resetEmail();
        setPassword('');
      }
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

  const handleRoleSelection = (selectedRole) => {
    setShowRoleModal(false);
    const roleName = Object.keys(config.roles).find((key) => config.roles[key] === selectedRole);
    navigate(`/home/${roleName}`);
    setAuth((prev) => ({ ...prev, currentRole: selectedRole }));
    localStorage.setItem('currentRole', selectedRole);
    resetEmail();
    setPassword('');
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

      {/* Modal select role */}
      <Modal show={showRoleModal} onHide={() => setShowRoleModal(false)} centered>
        <Modal.Header>
          <Modal.Title>{t('log_in_as')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {userRoles.map((role) => (
              <li key={role}>
                <ButtonB variant="link" onClick={() => handleRoleSelection(role)}>
                  {Object.keys(config.roles).find((key) => config.roles[key] === role)}
                </ButtonB>
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Login;
