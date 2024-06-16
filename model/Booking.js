
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    booking_date: { type: Date, required: true },
    num_people: { type: Number, required: true },
    total_cost: { type: Number, required: true },
    customer_names: [{ type: String, required: true }],
    phone_number: { type: String, required: true },
    file_upload: { type: String, required: true }, 
    customer_message: { type: String, required: true }
});

export default mongoose.model('Booking', bookingSchema);
