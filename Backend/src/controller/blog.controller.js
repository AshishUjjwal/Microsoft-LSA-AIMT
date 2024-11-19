import { Blog } from '../Models/blog.model.js';
import { User } from '../Models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import slugify from 'slugify';
import { BlogApproved } from '../Models/blogapproved.model.js';

const createBlog = asyncHandler(async (req, res) => {
    try {
        const { title, description, content, category, tags, imageUrl, authorImage, isApproved } = req.body;

        // Assuming `req.user` contains the authenticated user info after middleware (e.g., JWT auth)
        const authorId = req.user._id;  // Get the logged-in user's ID
        const userRole = req.user.role; // Get the user's role (e.g., 'admin', 'user')

        // Check if the author (user) exists in the database
        const author = await User.findById(authorId);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        // Ensure isApproved is always true if the user is an admin
        const finalIsApproved = userRole === 'admin' ? true : isApproved;

        // Create a new blog post instance
        const newBlog = new Blog({
            title,
            description,
            content,
            isApproved : finalIsApproved,
            category,
            tags,
            imageUrl,
            authorImage,
            author: authorId,  // Associate the blog with the logged-in user
            slug: slugify(title, { lower: true, strict: true }),  // Generate slug from title
        });

        const savedBlog = await newBlog.save();
        if (!savedBlog) {
            throw new ApiError('Failed to create Blog', 500);
        }

        // Automatically add approval entry if the creator is an admin
        if (userRole === 'admin') {
            const approval = new BlogApproved({
                blog: savedBlog._id,
                approvedBy: authorId, // Admin is the approver
            });
            await approval.save();
        }

        console.log('Blog created successfully:', savedBlog);

        res.status(200).json({
            message: 'Blog created successfully',
            blog: savedBlog,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating blog',
            error: error.message,
        });
    }
});

const getApprovedBlogs = asyncHandler(async (req, res) => {
    try {
        const blogs = await Blog.find({ isApproved: true }).populate('author', 'name email imageUrl role'); // Populates author with name and email
        res.status(200).json({
            message: 'Blogs fetched successfully',
            blogs,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching blogs',
            error: error.message,
        });
    }
});

const getAllBlogs = asyncHandler(async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'name email imageUrl role'); // Populates author with name and email
        res.status(200).json({
            message: 'Blogs fetched successfully',
            blogs,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching blogs',
            error: error.message,
        });
    }
});

const getfixedBlog = asyncHandler(async (req, res) => {
    try {
        const blogSlug = req.params.slug;
        const blog = await Blog.findOne({ slug: blogSlug }).populate('author', 'name email imageUrl'); // Populates author with name and email;
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Controller to get blogs for a logged-in user
const getBlogsForUser = asyncHandler(async (req, res) => {
    try {
        // Get the user ID from the authenticated request
        const userId = req.user._id;

        // Fetch blogs where the author matches the logged-in user
        const blogs = await Blog.find({ author: userId }).sort({ date: -1 });

        res.status(200).json({ success: true, data: blogs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, content, tags, imageUrl } = req.body;

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            {
                title,
                description,
                content,
                tags,
                imageUrl,
                updatedAt: Date.now(),
            },
            { new: true }  // Returns the updated blog post
        );

        if (!updatedBlog) {
            return res.status(404).json({
                message: 'Blog not found',
            });
        }

        res.status(200).json({
            message: 'Blog updated successfully',
            blog: updatedBlog,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating blog',
            error: error.message,
        });
    }
});

const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({
                message: 'Blog not found',
            });
        }

        res.status(200).json({
            message: 'Blog deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting blog',
            error: error.message,
        });
    }
});

export {
    createBlog,
    getApprovedBlogs,
    getAllBlogs,
    getfixedBlog,
    getBlogsForUser,
    updateBlog,
    deleteBlog,
};
