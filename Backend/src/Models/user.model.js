import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        name: {
            type: String,
            lowercase: true,
            trim: true,
            // index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'password is required']
        },
        role: {
            type: String,
            enum: ['user', 'admin'], // Allowed roles
            default: 'user' // Default role
        },
        refreshToken: {
            type: String
        },
    },
    {
        timestamps: true
    }
);


//Don't try to use arrow functions as objects can not be ascessed with arrow functions.
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

// Methods to create Accesstoken & RefreshToken
userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role,
        },
        process.env.ACCESS_TOKEN,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            // { expiresIn: '1d' }  // 1 days
        }
    )
}

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
}

export const User = mongoose.model('User', userSchema);