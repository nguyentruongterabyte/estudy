import classNames from 'classnames/bind';
import styles from './ForgotPassword.module.scss';
import { Fragment, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Button } from 'react-bootstrap';
import hooks from '~/hooks';
import { ToastContainer, toast } from 'react-toastify';
import OTPInput from 'react-otp-input';
import ChangePasswordForm from './ChangePasswordForm';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

const cx = classNames.bind(styles);

const NUM_OF_OTP = 6;
const CAPTCHA_SECRET_KEY = process.env.REACT_APP_CAPTCHA_SITE_KEY;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [renderOTPInput, setRenderOTPInput] = useState(false);
  const [renderChangePassword, setRenderChangePassword] = useState(false);
  const [OTP, setOTP] = useState();

  const handleOTPVerifySuccessfully = (OTP) => {
    setRenderChangePassword(true);
    setOTP(OTP);
  };

  const handleEmailSent = (email) => {
    setEmail(email);
    setRenderOTPInput(true);
  };

  return (
    <div className={cx('container')}>
      {renderChangePassword ? (
        <ChangePasswordForm email={email} OTP={OTP} />
      ) : (
        <Fragment>
          {renderOTPInput ? (
            <EnterOTPForm email={email} onOTPVerifySuccessfully={handleOTPVerifySuccessfully} />
          ) : (
            <RequestOTPEmail onEmailSent={handleEmailSent} />
          )}
        </Fragment>
      )}
      <ToastContainer />
    </div>
  );
};

const fn = () => {};

const RequestOTPEmail = ({ onEmailSent = fn }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const { sendOTPEmail } = hooks.useUserService();

  const sendOTPRequest = async (captcha, email) => {
    const data = await sendOTPEmail(captcha, email);
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaValue) {
      alert(t('pleaseVerifyRecaptcha'));
      return;
    }

    await toast
      .promise(sendOTPRequest(captchaValue, email), {
        pending: `${t('sendingEmail')} ${email}`,
        error: t('emailSendingError'),
        success: `${t('checkEmailForReset')} (${email})`,
      })
      .then((data) => {
        if (data.errCode === 2) {
          toast.warn(t('enterEmailOrVerifyCaptcha'));
          return;
        } else if (data.errCode === 3) {
          toast.warn(t('captchaVerificationFailed'));
          return;
        } else if (data.errCode === 4) {
          toast.warning(t('userNotFound'));
          return;
        }
        onEmailSent(email);
        alert(`${t('checkEmailForReset')} (${email})`);
      })
      .catch((e) => console.error(e));
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  return (
    <div className={cx('OTP-input-container')}>
      <div className={cx('group')}>
        <label className={cx('label')}>Email: </label>
        <input
          className={cx('input')}
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <ReCAPTCHA sitekey={CAPTCHA_SECRET_KEY} onChange={handleCaptchaChange} />
      <div className={cx('buttons-group')}>
        <Button className={cx('button')} size="lg" onClick={handleSubmit} variant="outline-warning">
          {t('send')}
        </Button>
      </div>
    </div>
  );
};

const EnterOTPForm = ({ email, onOTPVerifySuccessfully = fn }) => {
  const { verifyOTP } = hooks.useUserService();
  const [OTP, setOTP] = useState('');
  const handleVerifyOTP = async () => {
    const data = await verifyOTP(OTP, email);

    if (data.errCode !== 0) {
      toast.warn(data.errMessage);
    }

    /**
     * errCode = 2: User not found => hacking
     * errCode = 3: Limited Attemps
     * errCode = 4: Expired OTP
     */
    if (data.errCode === 2 || data.errCode === 3 || data.errCode === 4) {
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }

    if (data.errCode === 5) {
      console.log(data);
      toast.warn(`${t('remainingAttempts')} ${data.data.remainAttempts}`);
      return;
    }

    if (data.errCode === 0) {
      onOTPVerifySuccessfully(OTP);
    }
  };

  return (
    <div className={cx('OTP-input-container')}>
      <div className={cx('group')}>
        <label className={cx('label')}>{t('enterOtp')}</label>
        <OTPInput
          containerStyle={cx('OTP-input')}
          inputStyle={cx('cell')}
          value={OTP}
          onChange={setOTP}
          numInputs={NUM_OF_OTP}
          renderInput={(props) => <input {...props} />}
        />
      </div>
      <div className={cx('buttons-group')}>
        <Button onClick={() => setOTP('')} className={cx('button')} size="lg" variant="outline-light">
          {t('clearAll')}
        </Button>
        <Button
          onClick={handleVerifyOTP}
          disabled={OTP.length < NUM_OF_OTP}
          className={cx('button')}
          size="lg"
          variant="outline-warning"
        >
          {t('otpVerification')}
        </Button>
      </div>
    </div>
  );
};

export default ForgotPassword;
