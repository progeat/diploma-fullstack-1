module.exports = function (account) {
  return {
    id: account.id,
    name: account.name,
    type: account.type,
    balance: account.balance,
    createdAt: account.createdAt,
  };
};
