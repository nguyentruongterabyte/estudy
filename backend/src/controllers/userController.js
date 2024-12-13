import userService from '../services/userService';
import photoService from '../services/photoService';
import jwt from 'jsonwebtoken';

require('dotenv').config();

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
      httpOnly: true,
      sameSite: 'None',
      secure: true,
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
  } catch (e) {
    return res.status(500).json({
      errCode: 1,
      errMessage: error.message,
    });
  }
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
};
