// routes/events.js
import { Router } from 'express';
const router = Router();
import { verifyJWT } from '../middleware/auth.middleware.js';
import { verifyAdmin } from '../middleware/admin.middleware.js';


import { getEvents, createEvent, updateEvent } from '../controller/event.controller.js';


// @route   GET /api/events
// @desc    Get all events
// @access  Private
router.get('/getevent', getEvents);

// @route   POST /api/events
// @desc    Create a new event
// @access  Private/Admin
router.route('/create-event').post( verifyAdmin, createEvent);

// @route   PUT /api/events/:id
// @desc    Update an existing event
// @access  Private/Admin
router.route('/update-event').post( verifyAdmin, updateEvent);

// @route   DELETE /api/events/:id
// @desc    Delete an event
// @access  Private/Admin
// router.delete('/:id', authenticate, authorize('admin'), deleteEvent);

export default router;
