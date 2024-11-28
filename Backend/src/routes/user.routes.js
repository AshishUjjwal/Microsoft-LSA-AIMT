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

// http://localhost:8000/api/users
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJWT ,logoutUser);
router.route('/refresh-token').post(refreshAccessToken);
router.route('/current-user').get(verifyJWT, getCurrentUser);
router.route('/update-account').post(verifyJWT, updateUser);
// router.route('/change-password').post(verifyJWT, changeCurrentPassword);


// #--------------------------Admin Control-------------------------------------#
// Get all users
// http://localhost:8000/api/users/getalluser
router.get('/getalluser', verifyAdmin, getAllUsers);

// See specific user profile
// http://localhost:8000/api/users/profile/:userId
router.get('/profile/:userId', verifyAdmin, seeUserProfile);

// Update user profile
// http://localhost:8000/api/users/update/:userId
router.post('/update/:userId', verifyAdmin, updateUserProfile);

// Delete user
// http://localhost:8000/api/users/delete/:userId
// router.delete('/delete/:userId', verifyAdmin, deleteUser);

// Block/Unblock user
// http://localhost:8000/api/users/profile/status/:userId
// router.patch('/profile/status/:userId', verifyAdmin, toggleUserStatus);

// Search users by name, email, or role
// http://localhost:8000/api/users/profile/search
// router.get('/profile/search', verifyAdmin, searchUsers);

export default router;
