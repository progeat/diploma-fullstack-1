module.exports = function (user) {
  return {
    id: user.id,
    login: user.login,
    roleId: user.role,
    email: user.email,
    phone: user.phone,
    registeredAt: user.createdAt,
  };
};
