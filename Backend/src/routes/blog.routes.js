// routes/events.js
import { Router } from 'express';
const router = Router();
import { verifyJWT } from '../middleware/auth.middleware.js';
import { verifyAdmin } from '../middleware/admin.middleware.js';


import {
    createBlog,
    getBlogs,
    getfixedBlog,
    updateBlog,
    deleteBlog,
} from '../controller/blog.controller.js';


// @route   GET:  http://localhost:8000/api/blogs/getblog
router.get('/getblog', verifyJWT, getBlogs);

// Define API route to get a specific blog by ID
router.get('/getblog/:slug',verifyJWT, getfixedBlog);

// @route   POST http://localhost:8000/api/blogs/create-blog
router.route('/createblog').post(verifyAdmin, createBlog);

// @route   PUT http://localhost:8000/api/blogs/update-blog/:id
router.route('/update-blog/:id').put(verifyAdmin, updateBlog);

// @route   DELETE http://localhost:8000/api/blogs/delete-blog/:id
router.delete('/delete-blog/:id', verifyAdmin, deleteBlog);

export default router;
