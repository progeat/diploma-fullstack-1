module.exports = function (transaction) {
  return {
    id: transaction.id,
    account: transaction.account,
    category: transaction.category,
    amount: transaction.amount,
    comment: transaction.comment,
    createdAt: transaction.createdAt,
  };
};
