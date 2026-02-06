const express = require('express');
const router = express.Router();
const { createListing, getAllListings, getListingById,updateListing, deleteListing } = require('../controllers/listingController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getAllListings);
router.get('/:id', getListingById);
router.post('/', protect, createListing);
router.put('/:id', protect, updateListing);
router.delete('/:id', protect, deleteListing);
module.exports = router;