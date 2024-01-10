const otpGenerator = require("otp-generator");
const errorHandler = require("../utils/error");
const OTP = require("../Models/OTP");

const localVariables = (req, res, next) => {
  req.app.locals = {
    resetSession: false,
  };
  next();
};

const generateOTP = async (req, res, next) => {
  try {
    const { email } = req.user;

    const existingOTP = await OTP.findOne({ email });
    if (existingOTP) return;
    if (!existingOTP) {
      const newOTPCode = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });

      const newOTP = new OTP({
        email: email,
        code: newOTPCode,
      });

      await newOTP.save();

      return res.status(201).json({
        code: newOTPCode,
      });
    }
  } catch (error) {
    next(errorHandler(500, "There was a problem generating your OTP"));
  }
};

const deleteOTP = async (req, res) => {
  const { email } = req.user;

  await OTP.deleteOne({ email });

  res.status(201).json("OTP deleted successfully");
};

const resendOTP = async (req, res, next) => {
  try {
    const { email } = req.user;

    const existingOTP = await OTP.findOne({ email });

    if (existingOTP) {
      return res.status(201).json({ code: existingOTP.code });
    }
    if (!existingOTP) {
      const newOTPCode = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });

      const newOTP = new OTP({
        email: email,
        code: newOTPCode,
      });

      await newOTP.save();

      return res.status(201).json({
        code: newOTPCode,
      });
    }
  } catch (error) {
    return next(errorHandler(404, "Couldn't resend OTP"));
  }
};

const verifyOTP = async (req, res, next) => {
  try {
    const { email } = req.user;
    const { code } = req.query;

    const currentOTP = await OTP.findOne({ email });

    if (parseInt(currentOTP.code) === parseInt(code)) {
      await OTP.deleteOne({ email });
      req.app.locals.resetSession = true;

      res.status(201).json({
        success: true,
        status: 201,
        message: "Verification Successful",
      });
    } else {
      next(errorHandler(400, "Invalid OTP"));
    }
  } catch (error) {
    next(errorHandler(505, "Internal Server Error"));
  }
};

const createResetSession = async (req, res, next) => {
  if (req.app.locals.resetSession) {
    return res.status(201).json({ flag: req.app.locals.resetSession });
  }

  return next(errorHandler(440, "Session expired"));
};

module.exports = {
  generateOTP,
  verifyOTP,
  createResetSession,
  localVariables,
  resendOTP,
  deleteOTP,
};
