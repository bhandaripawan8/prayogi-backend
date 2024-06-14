

import mongoose from "mongoose";


// Define schema for yoga class
const yogaClassSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    header: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    days: {
        type: [String], 
        required: true
    },
    time: {
        type: String, 
        required: true
    }
});


export default mongoose.model('YogaClasses', yogaClassSchema);

