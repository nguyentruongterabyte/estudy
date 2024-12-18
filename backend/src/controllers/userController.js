import userService from '../services/userService';
import photoService from '../services/photoService';
import jwt from 'jsonwebtoken';
import captchaService from '../services/captchaService';
import emailService from '../services/emailService';
import crypto from 'crypto';

require('dotenv').config();

const OTP_EXPIRES_MINUTES = 5; // 5m
const OTP_ATTEMPTS_LIMIT = 5;

const handleVerifyCaptchaAndSendOTPEmail = async (req, res) => {
  const { captcha, email } = req.body;
  if (!captcha || !email) {
    console.log('Missing');
    return res.json({ errCode: 2, errMessage: 'Missing required parameters' });
  }
  try {
    const success = await captchaService.verifyCaptcha(captcha);
    if (!success) {
      return res.json({ errCode: 3, errMessage: 'CAPTCHA verification failed' });
    }

    const user = await userService.getOTPByEmail(email);

    if (!user) {
      return res.json({ errCode: 4, errMessage: 'User not found' });
    }

    const OTP = generateOTP();
    const OTPAttempts = 0;
    const OTPExpiresAt = new Date(Date.now() + OTP_EXPIRES_MINUTES * 60 * 1000);

    await userService.updateUser({ id: user.id, OTP, OTPAttempts, OTPExpiresAt });

    await emailService.sendEmail({
      recipientEmail: email, // Địa chỉ email người nhận
      subject: 'OTP code for change password', // Tiêu đề email
      html: OTPEmailForm(OTP),
    });

    res.json({ errCode: 0, errMessage: 'CAPTCHA verified successfully' });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleVerifyOTP = async (req, res) => {
  const { OTP, email } = req.body;

  try {
    const user = await userService.getOTPByEmail(email);
    if (!user) {
      return res.json({ errCode: 2, errMessage: 'User not found' });
    }

    if (user.OTPAttempts >= OTP_ATTEMPTS_LIMIT) {
      await userService.updateUser({ ...user, OTP: null, OTPAttempts: 0, OTPExpiresAt: null });
      return res.json({ errCode: 3, errMessage: 'Limited Attempts' });
    }

    // Check Expires
    const currentTime = new Date();
    if (currentTime > user.OTPExpiresAt) {
      await userService.updateUser({ ...user, OTP: null, OTPAttempts: 0, OTPExpiresAt: null });
      return res.json({ errCode: 4, errMessage: 'Expired OTP' });
    }

    const attempts = user.OTPAttempts;
    if (user.OTP !== OTP) {
      await userService.updateUser({ ...user, OTPAttempts: attempts + 1 });
      return res.json({
        errCode: 5,
        errMessage: 'Incorrect OTP',
        data: { remainAttempts: OTP_ATTEMPTS_LIMIT - attempts - 1 },
      });
    }

    // await userService.updateUser({ ...user, OTP: null, OTPAttempts: 0, OTPExpiresAt: null });
    res.json({ errCode: 0, errMessage: 'OK' });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleResetPassword = async (req, res) => {
  const { OTP, email, password } = req.body;
  try {
    const user = await userService.getOTPByEmail(email);
    if (!user) {
      return res.json({ errCode: 2, errMessage: 'User not found' });
    }

    if (user.OTPAttempts >= OTP_ATTEMPTS_LIMIT) {
      await userService.updateUser({ ...user, OTP: null, OTPAttempts: 0, OTPExpiresAt: null });
      return res.json({ errCode: 3, errMessage: 'Limited Attempts' });
    }

    // Check Expires
    const currentTime = new Date();
    if (currentTime > user.OTPExpiresAt) {
      await userService.updateUser({ ...user, OTP: null, OTPAttempts: 0, OTPExpiresAt: null });
      return res.json({ errCode: 4, errMessage: 'Expired OTP' });
    }

    const attempts = user.OTPAttempts;
    if (user.OTP !== OTP) {
      await userService.updateUser({ ...user, OTPAttempts: attempts + 1 });
      return res.json({
        errCode: 5,
        errMessage: 'Incorrect OTP',
      });
    }

    // Encrypt the password
    const hashedPassword = await userService.hashUserPassword(password);

    await userService.updateUser({ ...user, password: hashedPassword, OTP: null, OTPAttempts: 0, OTPExpiresAt: null });
    return res.json({
      errCode: 0,
      errMessage: 'OK',
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleGetById = async (req, res) => {
  const { id } = req.params;
  // const id = req.query.id;
  if (!id) {
    return res.status(400).json({
      errCode: 1,
      errMessage: 'Missing required parameters',
    });
  }

  try {
    const user = await userService.getById(id);

    let photo = '';
    if (user) {
      delete user.roles;
      if (user.photoId) {
        const photoDB = await photoService.get(user.photoId);
        photo = photoDB.filePath;
      }
    }

    return res.json({
      errCode: 0,
      errMessage: 'OK',
      data: {
        ...user,
        photo,
      },
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleUpdate = async (req, res) => {
  const { user } = req.body;

  try {
    await userService.updateUser(user);
    return res.json({
      errCode: 0,
      errMessage: 'OK',
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleGetAllUser = async (req, res) => {
  const users = await userService.getAllUsers();
  return res.json({
    errCode: 0,
    errMessage: 'OK',
    data: users,
  });
};

const handleNewEditor = async (req, res) => {
  const data = req.body;
  if (!data.email || !data.password) {
    return res.status(400).json({
      errCode: 1,
      errMessage: 'Email and password are required',
    });
  }

  try {
    // Check for duplicate
    const duplicate = await userService.checkUserEmail(data.email);
    if (duplicate) {
      return res.status(409).json({
        errCode: 1,
        errMessage: 'Email already exists',
      });
    }

    // Encrypt the password
    const hashedPassword = await userService.hashUserPassword(data.password);

    // Create new user
    const newUser = await userService.createEditor({
      ...data,
      password: hashedPassword,
    });

    delete newUser.password;
    return res.status(201).json({
      errCode: 0,
      errMessage: 'Register Successfully!',
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleNewUser = async (req, res) => {
  const data = req.body;
  if (!data.email || !data.password) {
    return res.status(400).json({
      errCode: 1,
      errMessage: 'Email and password are required',
    });
  }

  try {
    // Check for duplicate
    const duplicate = await userService.checkUserEmail(data.email);
    if (duplicate) {
      return res.status(409).json({
        errCode: 1,
        errMessage: 'Email already exists',
      });
    }

    // Encrypt the password
    const hashedPassword = await userService.hashUserPassword(data.password);

    // Create new user
    const newUser = await userService.createUser({
      ...data,
      password: hashedPassword,
    });

    delete newUser.password;
    return res.status(201).json({
      errCode: 0,
      errMessage: 'Register Successfully!',
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleUserLogin = async (req, res) => {
  const cookies = req.cookies;
  console.log(`cookie available at login: ${JSON.stringify(cookies)}`);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      errCode: 1,
      errMessage: 'Email and password are required!',
    });
  }

  try {
    // check email exists
    const isExist = await userService.checkUserEmail(email);

    if (!isExist) {
      return res.status(401).json({
        errCode: 1,
        errMessage: 'Unauthorized!',
      });
    }

    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        errCode: 2,
        errMessage: 'Unauthorized!',
      });
    }

    const matches = await userService.comparePassword(password, user.password);
    if (!matches) {
      return res.status(401).json({
        errCode: 3,
        errMessage: 'Unauthorized!',
      });
    }

    const roles = Object.values(user.roles);

    // Create JWTs
    const accessToken = jwt.sign(
      {
        userInfo: {
          id: user.id,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '30s',
      },
    );

    const newRefreshToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '14d',
      },
    );

    if (cookies?.jwt) {
      /*
      Scenario added here:
      1) User logs in but never uses refresh token and does not logout
      2) Refresh token is stolen
      3) If 1 & 2, reuse detection is needed to clear all refresh tokens when user logs in
      */

      const refreshToken = cookies.jwt;
      const foundToken = await userService.findRefreshToken(refreshToken);

      // Detected refresh token reuse!
      if (!foundToken) {
        console.log('attempted refresh token reuse at login!');
        await userService.deleteAllRefreshTokensByUserId(user.id);
      } else {
        await userService.deleteRefreshToken(foundToken.id);
      }

      // Delete current refresh token in cookies
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    }

    // saving refresh token with current user
    await userService.createNewRefreshToken(user.id, newRefreshToken);

    // save jwts to the cookie
    res.cookie('jwt', newRefreshToken, {
      /////////////////
      // Xóa khi build product
      // httpOnly: true,
      // sameSite: 'None',
      // secure: true,
      ///////////////
      maxAge: 14 * 24 * 60 * 60 * 1000,
    });
    delete user.password;
    delete user.roles;

    return res.json({
      errCode: 0,
      errMessage: 'Login successfully!',
      data: {
        user,
        accessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  try {
    const foundToken = await userService.findRefreshToken(refreshToken);
    if (!foundToken) return res.sendStatus(403); // Forbidden

    const foundUser = await userService.getById(foundToken.userId);
    // evalute jwt
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err || foundUser.id !== decoded.id) return res.sendStatus(403);

      const roles = Object.values(foundUser.roles);

      const accessToken = jwt.sign(
        {
          userInfo: {
            id: foundUser.id,
            roles: roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '30s',
        },
      );
      return res.json({
        errCode: 0,
        errMessage: 'OK',
        data: accessToken,
      });
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleLogout = async (req, res) => {
  // On client, also delete the access token

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content
  const refreshToken = cookies.jwt;

  // is refreshToken in database
  try {
    const foundToken = await userService.findRefreshToken(refreshToken);
    if (!foundToken) {
      res.clearCookie('jwt', { httpOnly: true });
      return res.sendStatus(204);
    } else {
      // delete refresh token in the database
      await userService.deleteRefreshToken(foundToken.id);
    }

    res.clearCookie('jwt', { httpOnly: true }); // secure: true - only serves on https

    return res.json({
      errCode: 0,
      errMessage: 'Logout successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleUpdateAvatar = async (req, res) => {
  const { id } = req.params;
  const { filePath } = req.body;
  try {
    await userService.updateAvatar(filePath, id);
    return res.json({
      errCode: 0,
      errMessage: 'OK!',
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleUpdatePassword = async (req, res) => {
  const { id } = req.params;
  const { password, newPassword } = req.body;
  if (!(id && password && newPassword))
    return res.status(400).json({
      errCode: 1,
      errMessage: 'Missing required parameters',
    });

  try {
    const user = await userService.getById(id, true);

    if (!user)
      return res.status(404).json({
        errCode: 1,
        errMessage: 'User not found',
      });

    const matches = await userService.comparePassword(password, user.password);

    if (!matches)
      return res.status(400).json({
        errCode: 1,
        errMessage: 'Old password is incorrect',
      });

    // Encrypt the password
    const hashedPassword = await userService.hashUserPassword(newPassword);

    await userService.updateUser({ id, password: hashedPassword });

    return res.json({
      errCode: 1,
      errMessage: 'OK',
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const handleDeleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getById(id);

    if (user) {
      if (user.photoId) {
        const photoDB = await photoService.get(user.photoId);
        await photoService.deleteFirebasePhotoByUrl(photoDB.filePath);
      }
      await userService.destroy(id);
    }
    return res.json({ errCode: 0, errMessage: 'OK' });
  } catch (error) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
};

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const OTPEmailForm = (OTP) => {
  return `<!DOCTYPE html>
            <html lang="en" >
            <head>
              <meta charset="UTF-8">
              <title>OTP Email</title>
              

            </head>
            <body>
            <!-- partial:index.partial.html -->
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
              <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                  <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Estudy</a>
                </div>
                <p style="font-size:1.1em">Hi,</p>
                <p>Thank you for choosing EStudy. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for ${OTP_EXPIRES_MINUTES} minutes</p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
                <p style="font-size:0.9em;">Regards,<br />EStudy</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                  <p>EStudy Inc</p>
                  <p>97 Man Thien, Hiep Phu, Thu Duc, HCMC</p>
                  <p>Vietnam</p>
                </div>
              </div>
            </div>
            <!-- partial -->
              
            </body>
            </html>`;
};

export default {
  handleGetAllUser,
  handleNewUser,
  handleNewEditor,
  handleGetById,
  handleUserLogin,
  handleRefreshToken,
  handleLogout,
  handleUpdate,
  handleUpdateAvatar,
  handleUpdatePassword,
  handleDeleteUser,
  handleVerifyCaptchaAndSendOTPEmail,
  handleVerifyOTP,
  handleResetPassword,
};
