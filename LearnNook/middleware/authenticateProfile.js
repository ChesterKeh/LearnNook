const jwt = require("jsonwebtoken");

const authenticateProfile = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];
    // Verify the token and decode the user information
    const decoded = jwt.verify(token, process.env.SECRET);
    // Attach decoded user information to the request object
    req.user = decoded.user;
    // Call the next middleware or route handler
    next();
  } catch (error) {
    // If there is an error (e.g., invalid token), return an error response
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authenticateProfile;
