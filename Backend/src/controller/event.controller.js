// controllers/eventController.js

import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import jwt from "jsonwebtoken"
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
  // return res.status(200).json({
  //   message: "ok"
  // })
  console.log(req.body);
  const { title, date, status, connectorIcon, description } = req.body;

  const newEvent = new Event({
    title,
    date,
    connectorIcon,
    status,
    description,
    createdBy: req.user._id
  });

  const event = await newEvent.save();
  res.json(event);

  if (!event) {
    throw new ApiError('Failed to create Event', 500);
  }

  return res.status(201).json(
    new ApiResponse(200, "Event Created Successfully", event)
  )

});

// // Update Event
const updateEvent = asyncHandler(async (req, res) => {
  const { title, date, status, connectorIcon, description } = req.body;

  // Build event object
  const eventFields = {};
  if (title) eventFields.title = title;
  if (date) eventFields.date = date;
  if (status) eventFields.status = status;
  if (connectorIcon) eventFields.connectorIcon = connectorIcon;
  if (description) eventFields.description = description;

  eventFields.updatedAt = Date.now();

  try {
    let event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ msg: 'Event not found' });

    event = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: eventFields },
      { new: true }
    );

    res.json(event);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.status(500).send('Server Error');
  }
});

// // Delete Event
// exports.deleteEvent = async (req, res) => {
//   try {
//     let event = await Event.findById(req.params.id);

//     if (!event) return res.status(404).json({ msg: 'Event not found' });

//     // Ensure user is admin
//     if (event.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
//       return res.status(401).json({ msg: 'User not authorized' });
//     }

//     await Event.findByIdAndRemove(req.params.id);

//     res.json({ msg: 'Event removed' });
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === 'ObjectId') {
//       return res.status(404).json({ msg: 'Event not found' });
//     }
//     res.status(500).send('Server Error');
//   }
// };


export {
  getEvents,
  createEvent,
  updateEvent,
  // deleteEvent,
};