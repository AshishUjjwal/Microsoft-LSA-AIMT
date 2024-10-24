
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import { User } from "../Models/user.model.js";


export const verifyJWT = asyncHandler(async(req, _, next) =>{
    try {
        // As CookiesParser is middleware, in app.js. So we can access cookies from anywhere in the app.

        // In a real-world application, the tokens are typically stored in cookies,
        // or sent as part of the Authorization header. In this example, we are using
        // the Authorization header for demonstration purposes.

        // In a real-world application, we would use a secure and encrypted cookie
        // to store the access token. In this example, we are using a simple
        // string to represent the access token for demonstration purposes.

        // With the help of cookies, we can retrieve the accessToken
        // and the after that we can decode that and can get the user information from accessToken.

        // cookieParser is global middleware as used in app.js.
        // When middleware is applied globally, 
        // it is accessible across all routes in your application. 
        // This is useful for tasks such as logging, security, or parsing requests.
        // console.log(req.body);

        const token = req.cookies?.accessToken || 
            req.header("Authorization")?.replace("Bearer ", "");
    
        if (!token) {
            throw new ApiError("Not authorized,... token is required", 401);
        }
        
        // Verify the JWT token using the secret key.
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
        // What Happens if the Token is Verified?
        // If the token is valid, the function jwt.verifyJWT() will decode the token, returning the payload (which contains the user data or other information encoded in the JWT).

        // This decoded token typically contains information like:

        // User ID
        // Expiration time (exp)
        // Issued at time (iat)
        // Custom claims (user role, permissions, etc.)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        console.log(user.name);
        if(!user) {
            throw new ApiError("User not found!!", 404);
        }
    
        // it helps to fetch the user data when user is logged in. 
        // We can use req. for getting user information in other methods(controller)
        req.user = user; 
        next();
    } catch (error) {
        throw new ApiError(error?.message || "Invalid access token", 401);
    }

})

// Whenever the user wants to access a protected route or resource, the user agent should
// send the JWT, typically in the Authorization header using the Bearer schema.
// The content of the header should look like the following:

// Authorization : Bearer <token>
// in this Authorization key we need to remove from value : Bearer and a single space to get token.