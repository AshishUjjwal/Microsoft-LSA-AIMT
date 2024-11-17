import mongoose, { Schema } from 'mongoose';

// Define the registration schema
const registrationSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
            required: true
        },
        registrationDate: {
            type: Date,
            default: Date.now
        },
    },
    {
        timestamps: true,   // Automatically adds createdAt and updatedAt fields
        versionKey: false // Removes the _v field from the document
    }
);

// Export the Registration model
export const Registration = mongoose.model('EventRegistration', registrationSchema);
