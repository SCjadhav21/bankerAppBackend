require("dotenv").config();
const jwt = require("jsonwebtoken");

const Authentication = (req, res, next) => {
  const token = req.headers.authorization;

  jwt.verify(token, process.env.key, async (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      req.body.userId = result.userId;
      next();
    }
  });
};

module.exports = { Authentication };
