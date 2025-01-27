const express = require('express');

const router = express.Router({ mergeParams: true });

router.use('/', require('./auth'));
router.use('/user', require('./user'));
router.use('/transactions', require('./transactions'));
router.use('/accounts', require('./accounts'));
router.use('/categories', require('./categories'));
router.use('/statistics', require('./statistics'));

module.exports = router;
