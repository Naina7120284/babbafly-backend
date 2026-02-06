const Listing = require('../models/Listing');
exports.createListing = async (req, res) => {
    try {
        const { title, description, category, price, location, images } = req.body;

        const listing = await Listing.create({
            sellerId: req.user._id,
            title,
            description,
            category,
            price,
            location,
            images
        });

        res.status(201).json(listing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllListings = async (req, res) => {
    try {
        let query = {};
        if (req.query.keyword) {
            query.title = { 
                $regex: req.query.keyword, 
                $options: 'i' 
            };
        }
        if (req.query.location) {
            query.location = { 
                $regex: req.query.location, 
                $options: 'i' 
            };
        }
        if (req.query.min || req.query.max) {
            query.price = {};
            if (req.query.min) query.price.$gte = Number(req.query.min);
            if (req.query.max) query.price.$lte = Number(req.query.max);
        }

        let sortOption = { createdAt: -1 };
        if (req.query.sort === 'price_low') sortOption = { price: 1 };
        if (req.query.sort === 'price_high') sortOption = { price: -1 };

        const listings = await Listing.find(query)
        .sort(sortOption)
        .populate('sellerId', 'name email')
        .populate('category', 'name iconUrl');

        res.json(listings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getListingById = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id).populate('sellerId', 'name email');
        if (!listing) return res.status(404).json({ message: "Listing not found" });
        res.status(200).json(listing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteListing = async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    if (listing) {
        if (listing.sellerId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to delete this" });
        }
        await listing.deleteOne();
        res.json({ message: 'Listing removed' });
    } else {
        res.status(404).json({ message: 'Listing not found' });
    }
};

exports.updateListing = async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    if (listing) {
        if (listing.sellerId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to update this" });
        }

        listing.title = req.body.title || listing.title;
        listing.description = req.body.description || listing.description;
        listing.price = req.body.price || listing.price;
        listing.location = req.body.location || listing.location;
        listing.category = req.body.category || listing.category;
        listing.images = req.body.images || listing.images;
        listing.status = req.body.status || listing.status;

        const updatedListing = await listing.save();
        res.json(updatedListing);
    } else {
        res.status(404).json({ message: 'Listing not found' });
    }
};

exports.deleteListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        if (listing.sellerId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to delete this" });
        }

        await listing.deleteOne();
        res.json({ message: "Listing removed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};