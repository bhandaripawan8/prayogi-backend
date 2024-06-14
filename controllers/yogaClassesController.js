// yogaClassesController.js

import express from 'express';
import YogaClasses from '../model/Classes.js'

const router = express.Router();

// CREATE - POST /api/yoga-classes
export const createNewClass = async (req, res) => {
    try {
        const { image, header, description, days, time } = req.body;
        const existingClass = await YogaClasses.findOne({ header, user });
        if (existingClass) {
          return res.status(400).json({ message: 'Duplicate yoga class found, please create a different one', success: false });
        }    
        const newClass = new YogaClasses({ image, header, description, days, time });
        const savedClass = await newClass.save();
        res.status(201).json({message: 'New Class created successfully', savedClass});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// READ - GET /api/yoga-classes
export const getAllYogaClasses = async (req, res) => {
    try {
        const classes = await YogaClasses.find();
        res.json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// READ ONE - GET /api/yoga-classes/:id
export const getOneYogaClass = async (req, res) => {
    try {
        const foundClass = await YogaClasses.findById(req.params.id);
        if (foundClass) {
            res.json(foundClass);
        } else {
            res.status(404).json({ message: 'Yoga class not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// UPDATE - PUT /api/yoga-classes/:id
export const updateYogaClass = async (req, res) => {
    try {
        const { image, header, description, days, time } = req.body;
        const updatedClass = await YogaClasses.findByIdAndUpdate(req.params.id, { image, header, description, days, time }, { new: true });
        if (updatedClass) {
            res.json({message: 'Class updated successfully', updatedClass});
        } else {
            res.status(404).json({ message: 'Yoga class not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// DELETE - DELETE /api/yoga-classes/:id
export const deleteYogaClass = async (req, res) => {
    try {
        const deletedClass = await YogaClasses.findByIdAndDelete(req.params.id);
        if (deletedClass) {
            res.json({ message: 'Yoga class deleted successfully' });
        } else {
            res.status(404).json({ message: 'Yoga class not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default router;
