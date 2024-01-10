const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/error");
const Register = require("../Models/Register");
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedToken;
    console.log(decodedToken);
    next();
  } catch (err) {
    next(errorHandler(401, "Authentication failed"));
  }
};

const verifyUser = async (req, res, next) => {
  try {
    const { email } = req.method === "GET" ? req.query : req.body;

    const existingUser = await Register.findOne({ email });
    if (!existingUser) return next(errorHandler(404, "Can't find User!"));

    req.user = { email };
    next();
  } catch (err) {
    next(errorHandler(404, "Authentication Error"));
  }
};

const verifyAuth = async (req, res, next) => {
  try {
    const { id } = req.user;

    const existingUser = await Register.findById(id);
    if (!existingUser) return next(errorHandler(404, "Can't find User!"));

    req.user = { userId: id };
    next();
  } catch (err) {
    next(errorHandler(404, "Authentication Error"));
  }
};

module.exports = { auth, verifyUser, verifyAuth };
