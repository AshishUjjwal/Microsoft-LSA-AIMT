import { User } from "../Models/user.model.js";
import { Blog } from "../Models/blog.model.js";
import { Registration } from '../Models/eventregistration.model.js'; // Assuming you have a Registration model

// Controller: Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching users", error });
  }
};

// Controller: See a specific user's profile
const seeUserProfile = async (req, res) => {
  const { userId } = req.params; // Extract userId from params
  try {
    // User #################################################################
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Blogs #################################################################
    const blogs = await Blog.find({ author: userId }).sort({ date: -1 });

    // Event Registered #################################################################
    const registrations = await Registration.find({ userId }).populate('eventId');
    // Extract event details from the populated eventId field
    const events = registrations.map((registration) => registration.eventId);

    res.status(200).json({ success: true, user, blogs, events });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching user profile", error });
  }
};

// Controller: Update user profile
const updateUserProfile = async (req, res) => {
  // console.log("hii");
  const { userId } = req.params;
  // console.log(`User Id: `,userId);
  const updates = req.body; // Contains fields to be updated
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (!updatedUser) {
      console.log("User not found");
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating user profile", error });
  }
};

// Controller: Delete user
const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting user", error });
  }
};

// Controller: Block/Unblock user
const toggleUserStatus = async (req, res) => {
  const { userId } = req.params;
  const { isActive } = req.body; // Boolean value indicating active/inactive
  try {
    const user = await User.findByIdAndUpdate(userId, { isActive }, { new: true });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const status = isActive ? "unblocked" : "blocked";
    res.status(200).json({ success: true, message: `User ${status} successfully`, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating user status", error });
  }
};

// Controller: Search Users
const searchUsers = async (req, res) => {
  const { name, email, role } = req.query; // Extract query parameters

  try {
    // Build a dynamic search query
    const searchQuery = {};
    if (name) searchQuery.name = { $regex: name, $options: "i" }; // Case-insensitive search
    if (email) searchQuery.email = { $regex: email, $options: "i" }; // Case-insensitive search
    if (role) searchQuery.role = role;

    const users = await User.find(searchQuery); // Perform the search
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: "No users found" });
    }

    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error searching users", error });
  }
};



export {
  getAllUsers,
  seeUserProfile,
  updateUserProfile,
  deleteUser,
  toggleUserStatus,
  searchUsers,
}