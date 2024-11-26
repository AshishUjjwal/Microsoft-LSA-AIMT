import { Router } from 'express';

import { verifyJWT } from '../middleware/auth.middleware.js'
import { verifyAdmin } from '../middleware/admin.middleware.js';

const router = Router();

import {registerUser, loginUser, logoutUser, refreshAccessToken , getCurrentUser, updateUser} from '../controller/user.controller.js';
import {
    getAllUsers,
    seeUserProfile,
    updateUserProfile,
    deleteUser,
    toggleUserStatus,
    searchUsers,
}  from '../controller/Admin.controller.js';

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJWT ,logoutUser);
router.route('/refresh-token').post(refreshAccessToken);
router.route('/current-user').get(verifyJWT, getCurrentUser);
router.route('/update-account').post(verifyJWT, updateUser);
// router.route('/change-password').post(verifyJWT, changeCurrentPassword);


// #--------------------------Admin Control-------------------------------------#
// Get all users
router.get('/getalluser', verifyAdmin, getAllUsers);

// See specific user profile
router.get('/profile/:userId', verifyAdmin, seeUserProfile);

// Update user profile
router.put('/profile/:userId', verifyAdmin, updateUserProfile);

// Delete user
router.delete('/profile/:userId', verifyAdmin, deleteUser);

// Search users by name, email, or role
router.get('/users/search', verifyAdmin, searchUsers);

// Block/Unblock user
router.patch('/profile/:userId/status', verifyAdmin, toggleUserStatus);

export default router;
