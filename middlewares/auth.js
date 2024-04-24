const { Token } = require("../models");

const auth = () => async (req, res, next) => {
  return new Promise(async (resolve) => {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.split(" ")[1];
      const foundToken = await Token.findOne({ token })
        .populate({
          path: "userId",
          populate: {
            path: "roleId",
            model: "Role",
          },
        })
        .exec();
      if (foundToken) {
        req.user = foundToken.userId;
        resolve();
      } else res.status(403).send("Invalid token");
    } else res.status(401).send("Invalid authorization");
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = auth;
