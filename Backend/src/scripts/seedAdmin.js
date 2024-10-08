// scripts/seedAdmin.js

import dotenv from 'dotenv';
dotenv.config(); // Load environment variables
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from '../Models/user.model.js';

// Seed Admin Function
const seedAdmin = async () => {
    console.log("hii");
    try {
        // Check if admin already exists
        const adminExists = await User.findOne({ role: 'admin' });
        if (adminExists) {
            console.log('Admin user already exists');
            return;
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt); // Replace 'securePassword' with a strong password

        // Create a new admin user
        const admin = new User({
            username: process.env.ADMIN_USERNAME,
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: 'admin',
        });

        await admin.save();
        console.log('Admin user created successfully');
    } catch (err) {
        console.error(err.message);
    } finally {
        mongoose.connection.close();
    }
};

// Execute the Seed Script
const run = async () => {
    await seedAdmin();
};

run();
