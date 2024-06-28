import Booking from '../model/Booking.js'

// creat a new booking
export const CreateBooking = async(req, res) =>{
    try{
        const { booking_date, num_people, total_cost, customer_names, phone_number, file_upload, customer_message } = req.body;
        const existingBooking = await Booking.findOne({ booking_date, phone_number });
        if(existingBooking){
            return res.status(409).json({message: 'Booking already exists for this date and phone number'})
        }
        const NewBooking = new Booking({booking_date, num_people, total_cost, customer_names, phone_number, file_upload, customer_message })
        const savedBooking = await NewBooking.save();
        res.status(201).json({message: 'Booking successful', savedBooking})
    }
    catch(error){
        res.status(400).json({message: error.message})
    }   
}

//get all booking
export const AllBooking = async (req, res) =>{
    try{
        const bookings = await Booking.find();
        res.status(200).json(bookings)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

//get a single booking by ID
export const getBookingById = async(req, res) =>{
    const id = req.params.id;
    try{
        const booking = await Booking.findById(id)
        if(booking == null){
            return res.status(404).json({message: 'Cannot find booking'})
        }
        res.status(200).json({booking})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

//update a booking
export const updateBooking = async (req, res) =>{
    try{
        const id = req.params.id;
        const {booking_date, num_people, total_cost, customer_names, phone_number, file_upload, customer_message } = req.body;
        const updateBooking = await Booking.findByIdAndUpdate(id, { booking_date, num_people, total_cost, customer_names, phone_number, file_upload, customer_message}, {new: true});
        if (updateBooking == null) {
            return res.status(404).json({ message: 'Cannot find booking' });
        }
        res.status(200).json(updateBooking);
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
}

// Delete a booking
export const deleteBooking = async (req, res) => {
    const id = req.params.id;
    try {
        const booking = await Booking.findByIdAndRemove(id);
        if (booking == null) {
            return res.status(404).json({ message: 'Cannot find booking' });
        }
        res.status(200).json({ message: 'Deleted booking' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};