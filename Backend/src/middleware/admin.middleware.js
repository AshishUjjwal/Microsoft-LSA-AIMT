// adminMiddleware.js
import jwt from 'jsonwebtoken';
import { User } from '../Models/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Middleware to check if the user is an admin
export const  verifyAdmin = asyncHandler(async (req, res, next) => {
  try {
    // Assuming you have an authentication middleware that attaches user info to req.user
    const token = req.cookies?.accessToken || req.header('Authorization')?.split(' ')[1];

    // console.log(token);
    
    if (!token) {
      throw new Error('Not authorized... token is required');
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    
    // Find the user associated with the decoded token
    const user = await User.findById(decoded?._id).select("-password -refreshToken")

    if (!user) {
      throw new Error('User not found');
    }

    // Check if the user has the 'admin' role
    // console.log(user.name);
    if (user.role !== 'admin') {
      console.log("Access denied. Admins only.");
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    // If the user is an admin, proceed to the next middleware or route handler
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Authentication failed or access denied.' });
    console.log(err);
  }
})
