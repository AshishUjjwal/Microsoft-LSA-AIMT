import connectdb from './src/db/db.js';
import dotenv from 'dotenv';
dotenv.config();
import { app } from './app.js';
import { User } from './src/Models/user.model.js';

const PORT = process.env.PORT || 8000;


connectdb()
    .then(() => {
        initializeAdmin();  // Call function to initialize admin
        app.listen(PORT || 8000, () => {
            console.log(`⚙️Server running on port ${PORT}`);
        })
    })
    .catch((err) => {
        console.log('Error connecting to the database', err);
        process.exit(1);  // Exit the process with an error code of 1
    })



// Function to initialize admin
const initializeAdmin = async () => {
    try {
        const adminExists = await User.findOne({ role: 'admin' });
        if (adminExists) {
            console.log('Admin user already exists');
            return;
        }

        const admin = new User({
            name: process.env.ADMIN_USERNAME || 'adminUser',
            email: process.env.ADMIN_EMAIL || 'admin@example.com',
            password: process.env.ADMIN_PASSWORD,
            role: 'admin',
        });

        await admin.save();
        console.log('Admin user created successfully');
    } catch (err) {
        console.error('Error initializing admin:', err.message);
    }
};