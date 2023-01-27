const express = require('express');
const router = express.Router();
const { createCategory } = require('../controller/categoryCtrl');

router.post('/', createCategory);

module.exports = router;
