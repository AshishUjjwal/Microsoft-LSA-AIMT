import { Router } from 'express';
const router = Router();
import { verifyJWT } from '../middleware/auth.middleware.js'; // JWT auth middleware

import {
    registerForEvent,
    getEventRegistrations,
    unregisterForEvent,
    getRegisteredEventsByUser,
    getRegistrationStatus,
} from '../controller/registration.controller.js';

// @route   POST: Register a user for an event
// @url     POST http://localhost:8000/api/registrations/register/:eventId
router.route('/register/:eventId').post(verifyJWT, registerForEvent);


// @route   DELETE: Unregister a user from an event
// @url     DELETE http://localhost:8000/api/registrations/unregister/:eventId
router.route('/unregister/:eventId').delete(verifyJWT, unregisterForEvent);

// Check registration status
// GET http://localhost:8000/api/registrations/:eventId/registration-status
router.route('/registration-status/:eventId').get( verifyJWT, getRegistrationStatus);

// Get all events registered by the logged-in user
// GET http://localhost:8000/api/registrations/registered-events
router.route('/registered-events').get(verifyJWT, getRegisteredEventsByUser);

// @route   GET: Get all registrations for an event
// @url     GET http://localhost:8000/api/registrations/allregistereduser/:eventId
router.route('/allregistereduser/:eventId').get(verifyJWT, getEventRegistrations);


export default router;