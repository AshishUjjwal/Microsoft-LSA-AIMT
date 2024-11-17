import { Registration } from '../Models/eventregistration.model.js'; // Assuming you have a Registration model
import { Event } from '../Models/event.model.js';
import { User } from '../Models/user.model.js';

import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"

// POST: Register for an event
// Assuming user ID comes from the frontend and event ID comes from the route parameter
// The registration should include the user ID and the event ID
// The registration should be associated with the user and the event
// The registration should be saved to the database
// Return the newly created registration object along with a success message
// If the event or user does not exist, return a 404 erro
export const registerForEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.params;
    const userId = req.user._id;  // Retrieved from verifyJWT middleware

    try {
        // Check if the event exists
        const event = await Event.findById(eventId);
        if (!event) {
            throw new ApiError('Event not found', 404);
        }

        // Check if the user is already registered for the event
        const existingRegistration = await Registration.findOne({ userId, eventId });
        if (existingRegistration) {
            throw new ApiError('User already registered for this event', 400);
        }

        // Create a new registration
        const newRegistration = new Registration({
            userId,
            eventId,
            registeredAt: Date.now(),
        });
        await newRegistration.save();

        return res.status(201).json({
            message: 'User successfully registered for the event',
            registration: newRegistration,
        });
    } catch (error) {
        // console.error(error.message);
        // return res.status(500).json({ message: 'Server error' });
        // throw new ApiError('Server error', 500);
        throw new ApiError(error?.message || "Server error", 401);
    }
});


// PUT: Cancel an existing registration
// Assuming registration ID comes from the route parameter
// Update the status of the registration to 'Cancelled'
// Return the updated registration object along with a success message
// If the registration does not exist, return a 404 error
// If the registration cannot be cancelled (e.g., it's already cancelled), return an appropriate message
// If the registration cannot be cancelled due to any other reason (e.g., invalid status), return an appropriate error message
export const unregisterForEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.params;
    const userId = req.user.id;  // Retrieved from verifyJWT middleware

    try {
        // Check if the registration exists
        const registration = await Registration.findOne({ userId, eventId });
        if (!registration) {
            return res.status(404).json({ message: 'Registration not found' });
        }

        // Use deleteOne() to remove the registration
        await registration.deleteOne();  // Correct method to use

        return res.status(200).json({
            message: 'User successfully unregistered from the event',
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Server error' });
    }
});


// @desc    Check if user is registered for a specific event
// @route   GET /api/events/:eventId/registration-status
// @access  Private
export const getRegistrationStatus = asyncHandler(async (req, res) => {
    const { eventId } = req.params;
    const userId = req.user._id;  // Retrieved from the JWT middleware

    try {
        // Check if a registration exists for this user and event
        const registration = await Registration.findOne({ userId, eventId });

        if (registration) {
            // If registration exists, user is registered
            return res.status(200).json({ isRegistered: true });
        } else {
            // If no registration is found, user is not registered
            return res.status(200).json({ isRegistered: false });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});


// @desc    Get all events registered by the logged-in user
// @route   GET /api/events/registered-events
// @access  Private
export const getRegisteredEventsByUser = asyncHandler(async (req, res) => {
    const userId = req.user.id;  // Retrieved from the JWT middleware

    try {
        // Find all registrations for this user
        const registrations = await Registration.find({ userId }).populate('eventId');

        // If no registrations found, return an empty array
        if (!registrations.length) {
            return res.status(200).json({ events: [] });
        }

        // Extract event details from the populated eventId field
        const events = registrations.map((registration) => registration.eventId);

        return res.status(200).json({ events });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});



// GET: View all registrations for a specific event
// Assuming event ID comes from the route parameter
// Return an array of registration objects for the event, along with their user information
// If the event does not exist, return a 404 erro
// If the event has no registrations, return an appropriate message
export const getEventRegistrations = asyncHandler(async (req, res) => {
    const { eventId } = req.params;

    try {
        // Check if the event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Get all registrations for this event
        const registrations = await Registration.find({ eventId }).populate('userId', 'name email');

        return res.status(200).json({
            message: 'Registrations fetched successfully',
            registrations,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Server error' });
    }
});
