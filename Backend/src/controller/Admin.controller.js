import { User } from "../Models/user.model.js";

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
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching user profile", error });
  }
};

// Controller: Update user profile
const updateUserProfile = async (req, res) => {
  const { userId } = req.params;
  const updates = req.body; // Contains fields to be updated
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (!updatedUser) {
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