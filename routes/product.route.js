import express from 'express';
import * as userController from '../controllers/userController.js'
const router = express.Router();

router.get('/',userController.index)
router.get('/:id',userController.get)
router.post('/',userController.update)
export default router