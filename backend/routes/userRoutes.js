import express from 'express';
import {authUser,registerUser,logoutUser,getUserProfile, updateUserProfile}from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { createNewItem, updateItem,deleteItem,getItems,getAllItems} from '../controllers/itemController.js';
const router=express.Router();

router.post('/register',registerUser)
router.post('/auth',authUser)
router.post('/logout',logoutUser)
router.route('/profile')
      .get(protect,getUserProfile)
      .put(protect,updateUserProfile)


router.route('/items')
      .get(protect,getItems)
      .post(protect,createNewItem)
      .put(protect,updateItem)
      .delete(protect,deleteItem);


//router.get('/allitems',protect,getItems)
export default router