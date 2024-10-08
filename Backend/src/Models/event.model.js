// models/Event.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Event schema
const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100 // Maximum title length
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Completed'],
    default: 'Upcoming'
  },
  connectorIcon: {
    type: String,
    enum: ['FaSyncAlt', 'FaLaptop', 'FaBed'], // Allowed icons
    default: 'FaSyncAlt'
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000 // Maximum description length
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User', // References the User model
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now // Timestamp of event creation
  },
  updatedAt: {
    type: Date,
    default: Date.now // Timestamp of last update
  }
});

// Middleware to update the updatedAt field before saving
EventSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Export the Event model
module.exports = mongoose.model('Event', EventSchema);
