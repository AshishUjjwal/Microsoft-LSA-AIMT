import  { BlogApproved } from '../Models/blogapproved.model.js';
import { Blog } from '../Models/blog.model.js'; // Assuming you have a Blog model

/**
 * Approve a blog
 * @route POST /api/blogs/:id/approve
 */
const approveBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const adminId = req.user._id; // Assuming the user is authenticated and role checked in middleware

        // Find the blog to ensure it exists
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Check if the blog is already approved
        const existingApproval = await BlogApproved.findOne({ blog: blogId });
        if (existingApproval) {
            return res.status(400).json({ message: 'Blog is already approved' });
        }

        // Mark the blog as approved
        blog.isApproved = true;
        await blog.save();

        // Create an approval entry
        const approval = new BlogApproved({
            blog: blogId,
            approvedBy: adminId,
        });
        await approval.save();

        res.status(200).json({ message: 'Blog approved successfully', approval });
    } catch (error) {
        console.error('Error approving blog:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Get all approved blogs
 * @route GET /api/blogs/approved
 */
const getApprovedBlogs = async (req, res) => {
    try {
        // Fetch all approved blogs with blog details and approver details
        const approvedBlogs = await BlogApproved.find()
            .populate({
                path: 'blog',
                select: 'title description content imageUrl category tags author authorImage createdAt',
                populate: {
                    path: 'author', // Populating the author field
                    select: 'name email role', // Include only the name and email of the author
                },
            })
            .populate('approvedBy', 'name email');

        res.status(200).json({ approvedBlogs });
    } catch (error) {
        console.error('Error fetching approved blogs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Revoke blog approval
 * @route DELETE /api/blogs/:id/unapprove
 */
const revokeApproval = async (req, res) => {
    try {
        const blogId = req.params.id;

        // Find and delete the approval entry
        const approval = await BlogApproved.findOneAndDelete({ blog: blogId });
        if (!approval) {
            return res.status(404).json({ message: 'Approval record not found' });
        }

        // Mark the blog as unapproved
        const blog = await Blog.findById(blogId);
        if (blog) {
            blog.isApproved = false;
            await blog.save();
        }

        res.status(200).json({ message: 'Blog approval revoked successfully' });
    } catch (error) {
        console.log('Error revoking blog approval:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export {
    approveBlog,
    getApprovedBlogs,
    revokeApproval,
};
