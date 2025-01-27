const mongoose = require('mongoose');

module.exports = function ({
  user,
  search,
  dateStart,
  dateEnd,
  accountId,
  categoryId,
}) {
  const userObjectId = new mongoose.Types.ObjectId(user);

  const options = [
    { user: { $in: userObjectId } },
    { comment: { $regex: search, $options: 'i' } },
    {
      createdAt: {
        $gte: dateStart,
        $lte: dateEnd,
      },
    },
  ];

  if (accountId !== '') {
    const accountObjectId = new mongoose.Types.ObjectId(accountId);

    options.push({ account: { $in: accountObjectId } });
  }

  if (categoryId !== '') {
    const categoryObjectId = new mongoose.Types.ObjectId(categoryId);

    options.push({ category: { $in: categoryObjectId } });
  }

  return options;
};
