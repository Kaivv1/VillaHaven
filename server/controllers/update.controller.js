const Register = require("../Models/Register");
const errorHandler = require("../utils/error");
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.user;

    if (id) {
      const body = req.body;
      await Register.updateOne({ _id: id }, body);

      res.status(201).json("User updated !");
      console.log("User updated");
    } else {
      next(errorHandler(401, "User not found !"));
    }
  } catch (err) {
    next(err);
  }
};

module.exports = updateUser;
