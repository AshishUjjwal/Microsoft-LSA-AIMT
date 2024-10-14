// models/Event.js

import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from './user.model.js';

// Define the Event schema
const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100 // Maximum title length
    },
    date: {
      type: String,
      // required: true
    },
    status: {
      type: String,
      enum: ['Upcoming', 'Completed'],
      default: 'Upcoming'
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000 // Maximum description length
    },
    connectorIcon: {
      type: String,
      default: 'https://t3.ftcdn.net/jpg/05/24/23/84/360_F_524238409_bhBWK45g7JQn9PI2TuUgzT8iZkLhTro5.jpg'
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User', // References the User model
      // required: true
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    versionKey: false // Removes the _v field from the document
  }
);

// Middleware to update the upDateAt field before saving
EventSchema.pre('save', function (next) {
  this.updateAt = Date.now();
  next();
});

// Export the Event model
export const Event = mongoose.model('Event', EventSchema);
