const express = require('express');
const {
  getCategories,
  getCategory,
  addCategory,
  editCategory,
  deleteCategory,
} = require('../controllers/category');
const authenticated = require('../middlewares/authenticated.js');
const hasRole = require('../middlewares/hasRole');
const mapCategory = require('../helpers/mapCategory');
const ROLES = require('../constants/roles');

const router = express.Router({ mergeParams: true });

router.get('/', authenticated, async (req, res) => {
  try {
    const categories = await getCategories(req.user.id);

    res.send({ error: null, data: categories.map(mapCategory) });
  } catch (e) {
    res.send({ error: e.message || 'Unknown error', data: null });
  }
});

router.get('/:id', authenticated, async (req, res) => {
  try {
    const category = await getCategory(req.user.id, req.params.id);

    res.send({ error: null, data: mapCategory(category) });
  } catch (e) {
    res.send({ error: e.message || 'Unknown error', data: null });
  }
});

router.post('/', authenticated, hasRole([ROLES.USER]), async (req, res) => {
  try {
    const newCategory = await addCategory({
      user: req.user.id,
      name: req.body.name,
      type: req.body.type,
      icon: req.body.icon,
      color: req.body.color,
    });

    res.send({ error: null, data: mapCategory(newCategory) });
  } catch (e) {
    res.send({ error: e.message || 'Unknown error', data: null });
  }
});

router.patch('/:id', authenticated, hasRole([ROLES.USER]), async (req, res) => {
  try {
    const updatedCategory = await editCategory(req.user.id, req.params.id, {
      name: req.body.name,
      type: req.body.type,
      icon: req.body.icon,
      color: req.body.color,
    });

    res.send({ error: null, data: mapCategory(updatedCategory) });
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
      await deleteCategory(req.user.id, req.params.id);

      res.send({ error: null });
    } catch (e) {
      res.send({ error: e.message || 'Unknown error' });
    }
  }
);

module.exports = router;
