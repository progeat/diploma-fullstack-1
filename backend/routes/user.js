const express = require('express');
const authenticated = require('../middlewares/authenticated');
const { updateUser, deleteUser } = require('../controllers/user');
const mapUser = require('../helpers/mapUser');

const router = express.Router({ mergeParams: true });

// get
router.get('/', authenticated, (req, res) => {
  res.send({ error: null, user: mapUser(req.user) });
});

// edit
router.patch('/', authenticated, async (req, res) => {
  try {
    // TODO доделать функционал изменения данных пользователя (изменение пароля)

    const { user, token } = await updateUser(req.user, req.body);

    res
      .cookie('token', token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || 'Unknown error' });
  }
});

// delete
router.delete('/', authenticated, async (req, res) => {
  try {
    const deletedUser = await deleteUser(req.user.id);

    res.send({ error: null });
  } catch (e) {
    res.send({ error: e.message || 'Unknown error' });
  }
});

module.exports = router;
