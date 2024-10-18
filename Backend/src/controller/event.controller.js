// controllers/eventController.js

import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { Event } from '../Models/event.model.js';

// Get All Events
const getEvents = asyncHandler(async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'name email');
    // res.json(events);
    return res
      .status(200)
      .json(new ApiResponse(200, "Events retrieved successfully", {
        Event: events,
      }));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create New Event
const createEvent = asyncHandler(async (req, res) => {
  try {
    const { title, date, status, connectorIcon, description } = req.body;

    const newEvent = new Event({
      title,
      date,
      connectorIcon,
      status,
      description,
      createdBy: req.user._id
    });

    const Newevent = await newEvent.save();
    // res.json(event);

    if (!Newevent) {
      throw new ApiError('Failed to create Event', 500);
    }

    console.log('Event created successfully:', Newevent);

    res.status(200).json({
      message: 'Event Added successfully',
      event: Newevent
    });
  } catch (error) {
    res.status(500).json({ message: 'Error Adding event', error });
  }

});

// // Update Event
const updateEvent = asyncHandler(async (req, res) => {
  try {
    const eventId = req.params.id; // Access the event._id from the route parameter
    const updatedData = req.body;  // Get the updated event data from the request body

    const updatedEvent = await Event.findByIdAndUpdate(eventId, updatedData, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({
      message: 'Event updated successfully',
      event: updatedEvent
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error });
  }
});

// // Delete Event
const deleteEvent = asyncHandler(async (req, res) => {
  try {
    const eventId = req.params.id; // Get the event ID from the route parameter

    // Find the event by ID and delete it
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    // Respond with a success message
    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
      deletedEvent // Optionally send back the deleted event
    });

  } catch (error) {
    console.error("Error deleting event:", error);

    // Handle server error
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the event",
      error: error.message
    });
  }
});


export {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};