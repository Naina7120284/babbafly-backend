const express = require('express');
const router = express.Router();
const { getCategories, createCategory, getListingsByCategory } = require('../controllers/categoryController');

router.get('/', getCategories);
router.post('/', createCategory);
router.get('/:id/listings', getListingsByCategory);

module.exports = router;