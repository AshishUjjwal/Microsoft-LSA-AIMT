import express from 'express';
import { approveBlog, getApprovedBlogs, revokeApproval } from '../controller/blogapproval.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { verifyAdmin } from '../middleware/admin.middleware.js';

const router = express.Router();

// Approve a blog (Admin only)
// http://localhost:8000/api/blogsapprove/approve/:id
router.post('/approve/:id',  verifyAdmin, approveBlog);

// Get all approved blogs
// http://localhost:8000/api/blogsapprove/getapprovedblogs
router.get('/getapprovedblogs',  getApprovedBlogs);

// Revoke blog approval (Admin only)
// http://localhost:8000/api/blogsapprove/unapprove/:id
router.delete('/unapprove/:id',  verifyAdmin, revokeApproval);

export default router;
