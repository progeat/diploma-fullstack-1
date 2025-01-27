const Transaction = require('../models/Transaction');
const createFindOptions = require('../helpers/createFindOptions');
const updateAccountBalance = require('../helpers/updateAccountBalance');
const { TYPE_CATEGORY } = require('../constants/typeCategory');
const { default: mongoose } = require('mongoose');

// add
async function addTransaction(transaction) {
  await updateAccountBalance({
    user: transaction.user,
    id: transaction.account,
    type: transaction.type,
    amount: transaction.amount,
  });

  const newTransaction = await Transaction.create(transaction);

  return { newTransaction };
}

// edit
async function editTransaction(id, user, transactionData) {
  const transaction = await Transaction.findById(id);

  if (!transaction) {
    throw new Error('Transaction not found');
  }

  if (user !== transaction.user.toString()) {
    throw new Error('Transaction access error');
  }

  const oldType = transaction.type;
  const oldAmount = transaction.amount;
  const oldAccount = transaction.account;

  if (oldAccount !== transactionData.account) {
    // Восстанавливаем баланс старого счёта если изменился счёт в операции
    await updateAccountBalance({
      user,
      id: oldAccount,
      oldType,
      type:
        oldType === TYPE_CATEGORY.INCOME
          ? TYPE_CATEGORY.EXPENSE
          : TYPE_CATEGORY.INCOME,
      oldAmount,
      amount: 0,
    });

    // Обновляем баланс счёта на который был изменен в операции
    await updateAccountBalance({
      user,
      id: transactionData.account,
      type: transactionData.type,
      amount: transactionData.amount,
    });
  } else {
    await updateAccountBalance({
      user,
      id: transactionData.account,
      oldType,
      type: transactionData.type,
      oldAmount,
      amount: transactionData.amount,
    });
  }

  const updatedTransaction = await Transaction.findByIdAndUpdate(
    id,
    transactionData,
    { new: true }
  );

  return updatedTransaction;
}

// delete
async function deleteTransaction(user, id) {
  const transaction = await Transaction.findById(id).exec();

  if (!transaction) {
    throw new Error('Transaction not found');
  }

  if (user !== transaction.user.toString()) {
    throw new Error('Transaction access error');
  }

  const { account, type, amount } = transaction;

  // Восстанавливаем баланс счёта
  await updateAccountBalance({
    user,
    id: account,
    oldType: type,
    type:
      type === TYPE_CATEGORY.INCOME
        ? TYPE_CATEGORY.EXPENSE
        : TYPE_CATEGORY.INCOME,
    oldAmount: amount,
    amount: 0,
  });

  return Transaction.deleteOne({ _id: id });
}

// get list with search, filters and pagination
async function getTransactions(
  user = null,
  search = '',
  limit = 10,
  page = 1,
  dateStart,
  dateEnd,
  accountId,
  categoryId
) {
  const [transactions, count] = await Promise.all([
    Transaction.find({
      $and: createFindOptions({
        user,
        search,
        dateStart,
        dateEnd,
        accountId,
        categoryId,
      }),
    })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .populate('category')
      .populate('account'),

    Transaction.countDocuments({
      $and: createFindOptions({
        user,
        search,
        dateStart,
        dateEnd,
        accountId,
        categoryId,
      }),
    }),
  ]);

  return {
    transactions,
    lastPage: Math.ceil(count / limit) || 1,
  };
}

// get item
async function getTransaction(user, id) {
  const transaction = await Transaction.findById(id);

  if (!transaction) {
    throw new Error('Transaction not found');
  }

  if (user !== transaction.user.toString()) {
    throw new Error('Transaction access error');
  }

  return transaction;
}

module.exports = {
  addTransaction,
  editTransaction,
  deleteTransaction,
  getTransactions,
  getTransaction,
};
