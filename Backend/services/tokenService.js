// const crypto = require("crypto");
import crypto from "crypto";

// Generate a random token
export const generateToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

// Validate the token expiration
export const isTokenValid = (expirationTime) => {
  return Date.now() < expirationTime;
};
