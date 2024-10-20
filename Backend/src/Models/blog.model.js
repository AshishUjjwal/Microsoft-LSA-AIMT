import mongoose, { Schema } from 'mongoose';
import { User } from './user.model.js';

// Define the schema for a blog post
const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        content: [
            {
                Header: {
                    type: String,
                    // required: true
                },
                Body: {
                    type: String,
                    // required: true
                }
            }
        ],
        author: {
            type: mongoose.Schema.Types.ObjectId,  // Reference to a User model
            required: true,
            ref: 'User',  // Assumes you have a User model
        },
        authorImage: {
            type: String,
            default: "https://100k-faces.glitch.me/random-image",
            // type: mongoose.Schema.Types.ObjectId,  // Reference to a User model
            // ref: 'User',  // Assumes you have a User model
            // required: true,
        },
        slug: { type: String, unique: true },  // Add slug field
        category: {
            type: String,
            required: true,
            enum: ['Technology', 'Lifestyle', 'Education', 'Health', 'Other'], // Example categories
            default: 'Other',
        },
        tags: {
            type: [String],  // Array of strings for tags like 'javascript', 'mongodb', etc.
            default: ['Technology', 'Lifestyle'],
        },
        imageUrl: {
            type: String,  // URL for the cover image of the blog
            default: 'https://img.freepik.com/free-vector/blog-post-concept-illustration_114360-26355.jpg',
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt timestamps
        versionKey: false // Removes the _v field from the document
    }
);

// Pre-save middleware to update the `updatedAt` field
blogSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Compile the schema into a model

export const Blog = mongoose.model('Blog', blogSchema);
