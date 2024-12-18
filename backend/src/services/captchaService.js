import axios from 'axios';

require('dotenv').config();

const CAPTCHA_SECRET_KEY = process.env.CAPTCHA_SECRET_KEY;
const GOOGLE_RECAPTCHA_SITE = 'https://www.google.com/recaptcha/api/siteverify';

const verifyCaptcha = (captcha) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(GOOGLE_RECAPTCHA_SITE, null, {
        params: {
          secret: CAPTCHA_SECRET_KEY,
          response: captcha,
        },
      });

      const { success } = response.data;
      resolve(success);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  verifyCaptcha,
};
