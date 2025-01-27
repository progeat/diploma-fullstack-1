const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generate } = require('../helpers/token');
const ROLES = require('../constants/roles');
const Transaction = require('../models/Transaction');
const Category = require('../models/Category');
const Account = require('../models/Account');

// register
async function register(login, password) {
  if (!password) {
    throw new Error('Password is empty');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    login,
    password: passwordHash,
  });

  const token = generate({ id: user.id });

  return { user, token };
}

// login
async function login(login, password) {
  const user = await User.findOne({ login });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error('Wrong password');
  }

  const token = generate({ id: user.id });

  return { token, user };
}

function getUsers() {
  return User.find();
}

function getRoles() {
  return [
    { id: ROLES.ADMIN, name: 'Admin' },
    { id: ROLES.MODERATOR, name: 'Moderator' },
    { id: ROLES.USER, name: 'User' },
  ];
}

// edit
async function updateUser(user, reqData) {
  const userUpdatedData = {};

  if (reqData?.login) {
    const user = await User.findOne({ login: reqData.login });

    if (user) {
      throw new Error('Логин занят');
    }

    userUpdatedData.login = reqData.login;
  }

  if (reqData?.email) {
    userUpdatedData.email = reqData.email;
  }

  if (reqData?.phone) {
    userUpdatedData.phone = reqData.phone;
  }

  if (reqData?.newPassword) {
    const isPasswordMatch = await bcrypt.compare(
      reqData?.oldPassword,
      user.password
    );

    if (!isPasswordMatch) {
      throw new Error('Неверно введен старый пароль');
    }

    const passwordHash = await bcrypt.hash(reqData.newPassword, 10);

    userUpdatedData.password = passwordHash;
  }

  const userWithUpdatedData = await User.findByIdAndUpdate(
    user.id,
    userUpdatedData,
    {
      returnDocument: 'after',
    }
  );

  const token = generate({ id: user.id });

  return {
    user: userWithUpdatedData,
    token,
  };
}

// delete
async function deleteUser(id) {
  await Account.deleteMany({ user: id });
  await Category.deleteMany({ user: id });
  await Transaction.deleteMany({ user: id });

  return User.deleteOne({ _id: id });
}

module.exports = {
  register,
  login,
  getUsers,
  getRoles,
  deleteUser,
  updateUser,
};
