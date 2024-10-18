import { Blog } from '../Models/blog.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import slugify from 'slugify';

const createBlog = asyncHandler(async (req, res) => {
    try {
        const { title, content, category, imageUrl, author, authorImage, tags } = req.body;

        // Create a new blog post instance
        const newBlog = new Blog({
            title,
            content,
            category,
            slug: slugify(title, { lower: true, strict: true }),  // Generate slug from title
            imageUrl,
            author,
            authorImage,
            tags,
            // author: req.user._id,  // Assuming req.user contains authenticated user
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
        const blogs = await Blog.find().populate('author', 'name email'); // Populates author with name and email
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
        const blog = await Blog.findOne({ slug: blogSlug });
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, content, author, category, imageUrl, tags } = req.body;

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            {
                title,
                content,
                author,
                authorImage,
                category,
                imageUrl,
                tags,
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
    updateBlog,
    deleteBlog,
};
