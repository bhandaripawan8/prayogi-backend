const express = require('express');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Booking = require('../models/Booking');

const router = express.Router();

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'bookings',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => file.originalname.split('.')[0],
    },
});

const parser = multer({ storage: storage });

router.post('/', parser.single('file_upload'), async (req, res) => {
    try {
        const { booking_date, num_people, total_cost, phone_number, customer_message } = req.body;
        const file_upload = req.file.path; // URL of the uploaded file
        const customer_names = req.body.customer_names.split(',');

        if (customer_names.length !== parseInt(num_people)) {
            return res.status(400).json({ error: "Number of customer names does not match number of people." });
        }

        const newBooking = new Booking({
            booking_date,
            num_people,
            total_cost,
            customer_names,
            phone_number,
            file_upload,
            customer_message
        });

        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
