// routes/events.js

const express = require('express');
const router = express.Router();
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { authenticate, authorize } = require('../middleware/auth');

// @route   GET /api/events
// @desc    Get all events
// @access  Private
router.get('/', authenticate, getEvents);

// @route   POST /api/events
// @desc    Create a new event
// @access  Private/Admin
router.post('/', authenticate, authorize('admin'), createEvent);

// @route   PUT /api/events/:id
// @desc    Update an existing event
// @access  Private/Admin
router.put('/:id', authenticate, authorize('admin'), updateEvent);

// @route   DELETE /api/events/:id
// @desc    Delete an event
// @access  Private/Admin
router.delete('/:id', authenticate, authorize('admin'), deleteEvent);

module.exports = router;
