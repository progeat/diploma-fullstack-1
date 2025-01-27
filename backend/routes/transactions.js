const express = require('express');
const {
  getTransactions,
  getTransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
} = require('../controllers/transaction');
const authenticated = require('../middlewares/authenticated.js');
const hasRole = require('../middlewares/hasRole');
const mapTransaction = require('../helpers/mapTransaction');
const ROLES = require('../constants/roles');

const router = express.Router({ mergeParams: true });

router.get('/', authenticated, async (req, res) => {
  try {
    const { transactions, lastPage } = await getTransactions(
      req.user.id,
      req.query.search,
      req.query.limit,
      req.query.page,
      req.query.dateStart || new Date(0),
      req.query.dateEnd || new Date(),
      req.query.account || '',
      req.query.category || ''
    );

    res.send({
      error: null,
      data: { lastPage, transactions: transactions.map(mapTransaction) },
    });
  } catch (e) {
    res.send({ error: e.message || 'Unknown error', data: null });
  }
});

router.get('/:id', authenticated, async (req, res) => {
  try {
    const transaction = await getTransaction(req.user.id, req.params.id);

    res.send({ error: null, data: mapTransaction(transaction) });
  } catch (e) {
    res.send({ error: e.message || 'Unknown error', data: null });
  }
});

router.post('/', authenticated, hasRole([ROLES.USER]), async (req, res) => {
  try {
    const newTransaction = await addTransaction({
      user: req.user.id,
      type: req.body.type,
      account: req.body.account,
      category: req.body.category,
      amount: req.body.amount,
      comment: req.body.comment,
    });

    res.send({
      error: null,
      data: {
        newTransaction: mapTransaction(newTransaction.newTransaction),
      },
    });
  } catch (e) {
    res.send({ error: e.message || 'Unknown error', data: null });
  }
});

router.patch('/:id', authenticated, hasRole([ROLES.USER]), async (req, res) => {
  try {
    const updatedTransaction = await editTransaction(
      req.params.id,
      req.user.id,
      {
        type: req.body.type,
        account: req.body.account,
        category: req.body.category,
        amount: req.body.amount,
        comment: req.body.comment,
      }
    );

    res.send({
      error: null,
      data: {
        updatedTransaction: mapTransaction(updatedTransaction),
      },
    });
  } catch (e) {
    res.send({ error: e.message || 'Unknown error', data: null });
  }
});

router.delete(
  '/:id',
  authenticated,
  hasRole([ROLES.USER]),
  async (req, res) => {
    try {
      const deletedTransaction = await deleteTransaction(
        req.user.id,
        req.params.id
      );

      res.send({ error: null });
    } catch (e) {
      res.send({ error: e.message || 'Unknown error', data: null });
    }
  }
);

module.exports = router;
