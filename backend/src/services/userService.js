import db from '../models/index';
import bcrypt from 'bcrypt';
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

const checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { email: userEmail },
      });

      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: userId },
        attributes: {
          exclude: ['password'],
        },
        raw: true,
      });

      const roles = await getUserRoles(user.id);
      const roleArr = roles.map( role => role.id );
      resolve({ ...user, roles: roleArr });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await db.User.findAll({
        attributes: {
          exclude: ['password', 'refreshToken'],
        },
        raw: true,
      });

      const usersWithRoles = await Promise.all(
        users.map(async (user) => {
          const roles = await getUserRoles(user.id);
          const roleArr = roles.map(role => role.id);
          return { ...user, roles: roleArr };
        }),
      );

      resolve(usersWithRoles);
    } catch (e) {
      reject(e);
    }
  });
};

const getUserByEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        attributes: ['id', 'email', 'password', 'firstName', 'lastName', 'phoneNumber'],
        where: { email: email },
        raw: true,
      });
      const roles = await getUserRoles( user.id );
      const roleArr = roles.map( role => role.id );
      resolve({ ...user, roles: roleArr });
    } catch (error) {
      reject(error);
    }
  });
};

const findRefreshToken = (refreshToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      const rT = await db.RefreshToken.findOne({
        where: { refreshToken },
        raw: true,
      });

      resolve(rT);
    } catch (e) {
      reject(e);
    }
  });
};

const deleteAllRefreshTokensByUserId = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.RefreshToken.destroy({
        where: {
          userId,
        },
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const deleteRefreshToken = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.RefreshToken.destroy({
        where: { id },
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};


const createNewRefreshToken = (userId, refreshToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.RefreshToken.create({
        userId,
        refreshToken,
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const createUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newUser = await db.User.create(data);

      await createUserRoles(newUser.id, 'USER');
      const userData = newUser.toJSON();
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

const createUserRoles = async (userId, ...roles) => {
  const roleRecords = await db.Role.findAll({
    where: {
      name: roles,
    },
    attributes: ['id'],
  });

  if (roleRecords.length === 0) {
    throw new Error('Roles not found');
  }

  const roleDetailsData = roleRecords.map((role) => ({
    userId,
    roleId: role.id,
    createdAt: new Date(), // Thêm createdAt
    updatedAt: new Date(), // Thêm updatedAt
  }));

  await db.RoleDetail.bulkCreate(roleDetailsData);
};

const updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [affectedRows] = await db.User.update(data, {
        where: { id: data.id },
      });
      resolve(affectedRows);
    } catch (error) {
      reject(error);
    }
  });
};

const getUserRoles = async (userId) => {
  const roles = await db.sequelize.query('CALL GetUserRoles(:userId)', {
    replacements: { userId: userId },
    type: db.sequelize.QueryTypes.RAW,
  });
  return roles;
};

const comparePassword = (password, hashedPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      const matches = bcrypt.compareSync(password, hashedPassword);
      resolve(matches);
    } catch (error) {
      reject(error);
    }
  });
};

export default {
  getAllUsers,
  getById,
  checkUserEmail,
  hashUserPassword,
  createUser,
  updateUser,
  comparePassword,
  getUserByEmail,
  findRefreshToken,
  deleteAllRefreshTokensByUserId,
  createNewRefreshToken,
  deleteRefreshToken,
};
