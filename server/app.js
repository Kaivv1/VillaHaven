/* eslint no-unused-vars: */

/* eslint no-undef: */
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const {
  generateOTPRouter,
  verifyOTPRouter,
  resendOTPRouter,
  deleteOTPRouter,
} = require("./routes/OTP.route");
const {
  getVillasRouter,
  uploadVillasRouter,
  setFavoriteVillaRouter,
  getUserFavoriteVillasRouter,
  deleteFavoriteVillaRouter,
  getVillaByIdRouter,
  updateVillaByIdRouter,
} = require("./routes/villas.route");
const {
  uploadTestimonialRouter,
  getTestimonialsRouter,
} = require("./routes/testimonials.route");
const { userRouter, userByTokenRouter } = require("./routes/getUser.route");
const { createFAQRouter, getFAQsRouter } = require("./routes/FAQs.route");
const {
  secretKeyRouter,
  secretEmailRouter,
  secretMapApiRouter,
} = require("./routes/secret.route");
const registerRouter = require("./routes/registerRouter");
const loginRouter = require("./routes/signin.route");
const updateUserRouter = require("./routes/updateUser.route");
const resetPassRouter = require("./routes/resetPassword.route");
const sendEmailRouter = require("./routes/mailer.route");
const passport = require("./passport-config/passportConfig");
const app = express();

app.use(passport.initialize());
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/user", userRouter);
app.use("/updateuser", updateUserRouter);
app.use("/generateOTP", generateOTPRouter);
app.use("/verifyOTP", verifyOTPRouter);
app.use("/resetPassword", resetPassRouter);
app.use("/sendEmail", sendEmailRouter);
app.use("/resendOTP", resendOTPRouter);
app.use("/secret", secretKeyRouter);
app.use("/deleteOTP", deleteOTPRouter);
app.use("/getvillas", getVillasRouter);
app.use("/uploadvilla", uploadVillasRouter);
app.use("/setfavoritevilla", setFavoriteVillaRouter);
app.use("/getuserfavorites", getUserFavoriteVillasRouter);
app.use("/removefavoritevilla", deleteFavoriteVillaRouter);
app.use("/getuser", userByTokenRouter);
app.use("/uploadtestimonial", uploadTestimonialRouter);
app.use("/gettestimonials", getTestimonialsRouter);
app.use("/createFAQ", createFAQRouter);
app.use("/getFAQs", getFAQsRouter);
app.use("/getappemail", secretEmailRouter);
app.use("/villa", getVillaByIdRouter);
app.use("/updatevilla", updateVillaByIdRouter);
app.use("/getmapAPI", secretMapApiRouter);
app.use(function (err, req, res, next) {
  const message = err.message || "Internal Server Error";
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

module.exports = app;
