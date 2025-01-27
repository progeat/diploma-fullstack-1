const express = require('express');
const {
  getAccounts,
  getAccount,
  addAccount,
  editAccount,
  deleteAccount,
} = require('../controllers/account');
const authenticated = require('../middlewares/authenticated.js');
const hasRole = require('../middlewares/hasRole');
const mapAccount = require('../helpers/mapAccount');
const ROLES = require('../constants/roles');

const router = express.Router({ mergeParams: true });

router.get('/', authenticated, async (req, res) => {
  try {
    const accounts = await getAccounts(req.user.id);

    res.send({ error: null, data: accounts.map(mapAccount) });
  } catch (e) {
    res.send({ error: e.message || 'Unknown error', data: null });
  }
});

router.get('/:id', authenticated, async (req, res) => {
  try {
    const account = await getAccount(req.user.id, req.params.id);

    res.send({ error: null, data: mapAccount(account) });
  } catch (e) {
    res.send({ error: e.message || 'Unknown error', data: null });
  }
});

router.post('/', authenticated, hasRole([ROLES.USER]), async (req, res) => {
  try {
    const newAccount = await addAccount({
      user: req.user.id,
      name: req.body.name,
      type: req.body.type,
      balance: req.body.balance,
    });

    res.send({ error: null, data: mapAccount(newAccount) });
  } catch (e) {
    res.send({ error: e.message || 'Unknown error', data: null });
  }
});

router.patch('/:id', authenticated, hasRole([ROLES.USER]), async (req, res) => {
  try {
    const updatedAccount = await editAccount(req.user.id, req.params.id, {
      name: req.body.name,
      type: req.body.type,
      balance: req.body.balance,
    });

    res.send({ error: null, data: mapAccount(updatedAccount) });
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
      await deleteAccount(req.user.id, req.params.id);

      res.send({ error: null });
    } catch (e) {
      res.send({ error: e.message || 'Unknown error' });
    }
  }
);

module.exports = router;
