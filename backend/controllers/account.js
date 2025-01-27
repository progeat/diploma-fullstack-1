const mongoose = require('mongoose');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

// add
async function addAccount(account) {
  const newAccount = await Account.create(account);

  return newAccount;
}

// edit
async function editAccount(user, id, accountData) {
  const account = await Account.findById(id);

  if (!account) {
    throw new Error('Account not found');
  }

  if (user !== account.user.toString()) {
    throw new Error('Account access error');
  }

  const newAccount = await Account.findByIdAndUpdate(id, accountData, {
    returnDocument: 'after',
  });

  return newAccount;
}

// delete
async function deleteAccount(user, id) {
  const account = await Account.findById(id);

  if (!account) {
    throw new Error('Account not found');
  }

  if (user !== account.user.toString()) {
    throw new Error('Account access error');
  }

  await Transaction.deleteMany({ account: id });

  return Account.deleteOne({ _id: id });
}

// get list with search and pagination
async function getAccounts(user) {
  const userObjectId = new mongoose.Types.ObjectId(user);

  const accounts = await Account.find({ user: { $in: userObjectId } });

  return accounts.sort((a, b) => b.balance - a.balance);
}

// get item
async function getAccount(user, id) {
  const account = await Account.findById(id);

  if (!account) {
    throw new Error('Account not found');
  }

  if (user !== account.user.toString()) {
    throw new Error('Account access error');
  }

  return account;
}

module.exports = {
  addAccount,
  editAccount,
  deleteAccount,
  getAccounts,
  getAccount,
};
