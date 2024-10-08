import { Router } from 'express';
import { verifyJWT} from '../middleware/auth.middleware.js'

const router = Router();

import {registerUser, loginUser, logoutUser } from '../controller/user.controller.js';

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJWT ,logoutUser);
// router.route('/refresh-token').post(refreshAccessToken);
// router.route('/change-password').post(verifyJWT, changeCurrentPassword);
// router.route('/current-user').get(verifyJWT, getCurrentUser);
// router.route('/update-account').patch(verifyJWT, updateAccountDetails);
// router.route('/update-avatar').patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
// router.route('/update-cover-image').patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);
// router.route('/c/:username').get(verifyJWT, getUserChannelProfile);

export default router;
