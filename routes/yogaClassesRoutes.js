
import express from 'express'
const router = express.Router();


import {createNewClass, getAllYogaClasses, getOneYogaClass, updateYogaClass, deleteYogaClass} from '../controllers/yogaClassesController.js'

router.post('/',createNewClass);
router.get('/all',getAllYogaClasses);
router.get('/:id',getOneYogaClass);
router.put('/:id',updateYogaClass);
router.delete('/:id',deleteYogaClass);


export default router;