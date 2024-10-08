// utility folder is commonly used to store utility functions 
// and modules that provide commonly used features or abstractions across the application. 
// The purpose of this folder is to keep your codebase organized 
// and maintainable by separating concerns and avoiding code duplication.


const asyncHandler = (requestHandler) =>{
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch(err => next(err));
    }
}

export {asyncHandler};