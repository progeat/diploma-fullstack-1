const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');
const getStartPeriodDate = require('../helpers/getStartPeriodDate');
const getStatisticsOnTransactions = require('../helpers/getStatisticsOnTransactions');

async function getStatisticsForPeriod(user, period = 1) {
  const startPeriodDate = getStartPeriodDate(period);
  const userObjectId = new mongoose.Types.ObjectId(user);

  const transactions = await Transaction.find({
    $and: [
      { user: { $in: userObjectId } },
      {
        createdAt: {
          $gte: startPeriodDate,
        },
      },
    ],
  });

  const statisticsOnTransactions = await getStatisticsOnTransactions(
    transactions
  );

  return statisticsOnTransactions;
}

module.exports = {
  getStatisticsForPeriod,
};
