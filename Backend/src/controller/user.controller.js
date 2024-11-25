import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import jwt from "jsonwebtoken"
import { User } from '../Models/user.model.js';


const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        // console.log('GeneratedAccessToken : ', accessToken);
        // console.log('GeneratedRefreshToken : ', refreshToken);

        user.refreshToken = refreshToken; // Making Object in user
        await user.save({ validationBeforeSave: false }); // saving in the database not required validation

        return { accessToken, refreshToken };

    } catch (error) {
        throw new ApiError("Error generating access token & refresh token", 500, error);
    }
}

const registerUser = asyncHandler(async (req, res) => {
    // return res.status(200).json({
    //     message: "ok"
    // })

    const { name, email, password } = req.body;

    // check for required fields
    if ([name, email, password].some((field) =>
        typeof field === 'undefined')
    ) {
        throw new ApiError('All fields are required', 400);
    }

    // check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new ApiError('User already exists', 409);
    }

    // Save the user object in the database.
    const newUser = await User.create({
        // username: username.toLowerCase(),
        name,
        email,
        password,
        // avatar: avatar.url,
        // coverImage: coverImage?.url || "",
    });

    const createdUser = await User.findById(newUser._id).select(
        '-password -refreshToken'
    )
    if (!createdUser) {
        throw new ApiError('Failed to create user', 500);
    }

    return res.status(201).json(
        new ApiResponse(200, "User Registered Successfully", createdUser)
    )
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email })
    if (!user) {
        throw new ApiError('User not found', 404);
    }
    // validate the password
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        // throw new ApiError('Invalid password', 401);
        return res.status(404).json({ message: 'Invalid password' });
    }
    // generate access and refresh tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    // console.log("AccessToken : ", accessToken);
    // console.log("RefreshToken : ", refreshToken);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");  // select command remove the give argument for accessing.
    console.log(loggedInUser.email);

    const options = {
        httpOnly: true,   // To make it accessible to JavaScript
        secure: true,  // to make it accessible to JavaScript
        sameSite: 'Strict', // To prevent CSRF attacks
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)  // key and value
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, "Logged In Successfully", {
            user: loggedInUser,
            accessToken: accessToken
        }));
});

const logoutUser = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: { // updating refresh token from the database
                refreshToken: 1 // this remove the field from document
            }
        },
        {
            new: true
        },
    )

    const options = {
        // expires: new Date(0),  // cookie will expire when browser is closed
        httpOnly: true,
        secure: true
    }

    // console.log("Logged Out Successfully");
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, "Logged Out Successfully"));
});

// Update User Controller
const updateUser = asyncHandler(async (req, res) => {
    const user = req.user;
    const { name, avatarUrl, location, description, social, password } = req.body;

    try {
        // Find the user by ID
        // const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields if they are provided
        if (name) user.name = name;
        if (avatarUrl) user.avatarUrl = avatarUrl;
        if (location) user.location = location;
        if (description) user.description = description;
        if (social) user.social = social;

        // If password is provided, hash and update it
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        // Save the updated user
        await user.save();

        // Respond with updated user data (excluding password)
        const updatedUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            avatarUrl: user.avatarUrl,
            location: user.location,
            description: user.description,
            social: user.social,
            role: user.role,
        };

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


const refreshAccessToken = asyncHandler(async (req, res) => {
    // Implementing refresh token logic here...
    // 1. Validate the refresh token in the request cookies or body.
    // 2. If the refresh token is invalid, return an error.
    // 3. If the refresh token is valid, generate a new access token and refresh token.
    // 4. Set the new access token and refresh token in the response cookies.
    // 5. Return the user object as a response and send cookies.
    // 6. Remove the old refresh token from the database.

    // Note: In a real-world application, you would also want to implement password hashing, token expiration, and refresh token storage.

    // The logic for implementing a refresh token in your code is a common and crucial part of authentication systems, especially for maintaining user sessions without requiring frequent logins.
    // Why We Implement Refresh Tokens:
    // 1. Security:
    // Access tokens (typically JWTs) are used to authorize users and are usually short-lived (e.g., 15 minutes to 1 hour).
    // Refresh tokens are long-lived tokens that allow users to request new access tokens without requiring them to log in again. This adds an extra layer of security because it limits the exposure of access tokens, which are often sent with every request.
    // 2. Session Management:
    // Instead of making users log in every time their access token expires, the refresh token allows seamless access by generating a new access token in the background. This is particularly useful in applications where users interact with the app for extended periods (e.g., dashboard apps).
    // 3. Stateless Authentication:
    // Since access tokens are short-lived and don't need to be stored in the database, the application can remain stateless (as long as the access token is valid).
    // However, refresh tokens are often stored in the database to manage things like token expiration and user session invalidation (e.g., logging a user out if the refresh token has been revoked).
    // return res.status(200).json({
    //     message: "ok"
    // })
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    // console.log(incomingRefreshToken);
    if (!incomingRefreshToken) {
        throw new ApiError('Refresh token is required', 401);
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN);
        // console.log(decodedToken);
        const user = await User.findById(decodedToken?._id)
        // console.log(user);
        if (!user) {
            throw new ApiError('Invalid refresh token', 401);
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError('RefreshToken is expired or used', 401);
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user?._id);
        console.log('NewAccessToken : ', accessToken);
        console.log('NewRefreshToken : ', refreshToken);
        if (!accessToken && !refreshToken) console.log("Failed to Generate new Access Token and new Refresh Token");
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            // .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(200, "Refreshed Access Token", {
                user: user,
                accessToken: accessToken
            }));

    } catch (error) {
        const options = {
            httpOnly: true,
            secure: true
        }
        console.log("Invalid Refresh Token : ", error);
        res
            .status(401)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({
                error: "Refresh Token Expired",
                message: "Please login again",
                statusCode: 401,
                action: "CLEAR_STORAGE", // Signal to the client to clear local storage
            });
        // throw new ApiError(error?.message || "Invalid refresh token", 401);
    }
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, "User retrieved successfully", {
            user: req.user
        }));
});

export {
    registerUser,
    loginUser,
    logoutUser,
    updateUser,
    refreshAccessToken,
    getCurrentUser,
    generateAccessAndRefreshToken,
};