const errorHandler = require("../utils/error");
const Register = require("../Models/Register");
const bcryptjs = require("bcryptjs");
const resetPassword = async (req, res, next) => {
  try {
    if (!req.app.locals.resetSession)
      return next(errorHandler(440, "Session expired"));

    const { email, password } = req.body;

    const user = await Register.findOne({ email });
    if (!user) return next(errorHandler(404, "User not found"));

    if (user) {
      const hashedPassword = bcryptjs.hashSync(password, 10);
      await Register.findOneAndUpdate(
        { email },
        {
          password: hashedPassword,
        }
      );
      req.app.locals.resetSession = false;
      return res
        .status(201)
        .json({ success: true, status: 201, message: "User updated" });
    }
  } catch (error) {
    return next(errorHandler(500, error));
  }
};

module.exports = resetPassword;
