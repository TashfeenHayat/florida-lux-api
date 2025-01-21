const { Token } = require("../models");

const auth = () => async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).send("Authorization header is missing");
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).send("Token is missing");
    }

    // Check for token in the database
    const foundToken = await Token.findOne({ token })
      .populate({
        path: "userId",
        populate: {
          path: "roleId",
          model: "Role",
        },
      })
      .exec();

    if (!foundToken) {
      return res.status(403).send("Invalid token");
    }

    // Attach user information to the request object for further use
    req.user = foundToken.userId;

    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    return res.status(500).send("Internal server error");
  }
};

module.exports = auth;
