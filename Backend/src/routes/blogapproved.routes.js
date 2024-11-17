import express from 'express';
import { approveBlog, getApprovedBlogs, revokeApproval } from '../controller/blogapproval.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { verifyAdmin } from '../middleware/admin.middleware.js';

const router = express.Router();

// Approve a blog (Admin only)
// http://localhost:8000/api/blogsapprove/:id/approve
router.post('/:id/approve',  verifyAdmin, approveBlog);

// Get all approved blogs
// http://localhost:8000/api/blogsapprove/getapprovedblogs
router.get('/getapprovedblogs', verifyJWT,  getApprovedBlogs);

// Revoke blog approval (Admin only)
// http://localhost:8000/api/blogsapprove/:id/unapprove
router.delete('/:id/unapprove',  verifyAdmin, revokeApproval);

export default router;
