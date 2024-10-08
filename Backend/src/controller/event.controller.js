// controllers/eventController.js

const Event = require('../models/Event');

// Get All Events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'username email');
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create New Event
exports.createEvent = async (req, res) => {
  const { title, date, status, connectorIcon, description } = req.body;

  try {
    const newEvent = new Event({
      title,
      date,
      status,
      connectorIcon,
      description,
      createdBy: req.user.id
    });

    const event = await newEvent.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update Event
exports.updateEvent = async (req, res) => {
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

    // Ensure user is admin
    if (event.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'User not authorized' });
    }

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
};

// Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ msg: 'Event not found' });

    // Ensure user is admin
    if (event.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Event.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Event removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.status(500).send('Server Error');
  }
};
