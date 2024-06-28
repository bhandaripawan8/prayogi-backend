import express from 'express'
const router = express.Router();


import {CreateBooking, getBookingById, AllBooking, updateBooking, deleteBooking} from '../controllers/bookingController.js'

router.post('/',CreateBooking);
router.get('/all',AllBooking);
router.get('/:id',getBookingById);
router.put('/:id',updateBooking);
router.delete('/:id',deleteBooking);


export default router;