require("dotenv").config();
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

const AdminAuthentication = async (req, res, next) => {
  const token = req.headers.authorization;

  jwt.verify(token, process.env.key, async (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const users = await UserModel.findOne({ _id: result.userId });

      if (users.email == process.env.adminEmail) {
        req.body.userId = result.userId;
        next();
      } else {
        res.status(200).json("Not Authorised");
      }
    }
  });
};

module.exports = { AdminAuthentication };
