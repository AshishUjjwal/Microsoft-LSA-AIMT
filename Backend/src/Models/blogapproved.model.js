import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogApprovedSchema = new Schema(
    {
        blog: {
            type: Schema.Types.ObjectId,
            ref: 'Blog',
            required: true,
        },
        approvedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User', // Admin who approved the blog
            required: true,
        },
        approvalDate: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Compile the model

export const BlogApproved = mongoose.model('BlogApproved', blogApprovedSchema);