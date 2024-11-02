import { Blog } from '../Models/blog.model.js';
import { User } from '../Models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import slugify from 'slugify';

const createBlog = asyncHandler(async (req, res) => {
    try {
        const { title, description, content, category, tags, imageUrl, authorImage } = req.body;

        // Assuming `req.user` contains the authenticated user info after middleware (e.g., JWT auth)
        const authorId = req.user._id;  // Get the logged-in user's ID

        // Check if the author (user) exists in the database
        const author = await User.findById(authorId);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        // Create a new blog post instance
        const newBlog = new Blog({
            title,
            description,
            content,
            category,
            tags,
            imageUrl,
            authorImage,
            author: authorId,  // Associate the blog with the logged-in user
            slug: slugify(title, { lower: true, strict: true }),  // Generate slug from title
        });


        const savedBlog = await newBlog.save();
        if (!savedBlog) {
            throw new ApiError('Failed to create Event', 500);
        }

        console.log('Event created successfully:', savedBlog);

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

const getBlogs = asyncHandler(async (req, res) => {
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
    getBlogs,
    getfixedBlog,
    getBlogsForUser,
    updateBlog,
    deleteBlog,
};
