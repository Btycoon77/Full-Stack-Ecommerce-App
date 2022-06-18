const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require('jsonwebtoken');
const catchAsyncError = require("./catchAsyncError");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const {token} = req.cookies;
  console.log(token);

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  // everything is stored in req.user when user logs in ie credentials;
  console.log(req.user);
  req.user = await User.findById(decodedData.id);
  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // basically accessging the attributes of the user(role) by req.user.role;
    if (!roles.includes(req.user.role)) {
     return next (new ErrorHandler(
        `Role:${req.user.role} is not allowed to access this resource`,403
      ));
    }
    next();
  };
};
