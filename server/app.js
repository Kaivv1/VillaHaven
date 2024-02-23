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
  addReservedDatesToVillaRouter,
} = require("./routes/villas.route");
const {
  uploadTestimonialRouter,
  getTestimonialsRouter,
} = require("./routes/testimonials.route");
const {
  userRouter,
  userByTokenRouter,
  registerRouter,
  loginRouter,
  updateUserRouter,
  resetPassRouter,
  deleteUserRouter,
} = require("./routes/user.route");
const { createFAQRouter, getFAQsRouter } = require("./routes/FAQs.route");
const {
  secretKeyRouter,
  secretEmailRouter,
  secretStripeKeyRouter,
  clientSecretRouter,
} = require("./routes/secret.route");
const sendEmailRouter = require("./routes/mailer.route");
const passport = require("./passport-config/passportConfig");
const {
  createReservationRouter,
  getReservationByIdRouter,
  checkAvailabilityRouter,
  getAllUserReservationsRouter,
  deleteReservationByIdRouter,
} = require("./routes/reservation.route");
const webhookRouter = require("./routes/webhook.route");
const Reservation = require("./Models/Reservation");
const {
  getImageRouter,
  uploadImageRouter,
} = require("./routes/s3Bucket.route");

const app = express();

app.use(passport.initialize());
app.use(cors());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});

const router = express.Router();

router.get("/api/test", async (req, res, next) => {
  return res.status(200).json({
    title: "Express Testing",
    message: "The app is working properly!",
  });
});

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
app.use("/create-reservation", createReservationRouter);
app.use("/stripe-secret-key", secretStripeKeyRouter);
app.use("/create-payment-intent", clientSecretRouter);
app.use("/add-reserved-dates", addReservedDatesToVillaRouter);
app.use("/get-reservation", getReservationByIdRouter);
app.use("/get-image", getImageRouter);
app.use("/upload-image", uploadImageRouter);
app.use("/check-availability", checkAvailabilityRouter);
app.use("/get-user-reservations", getAllUserReservationsRouter);
app.use("/delete-reservation", deleteReservationByIdRouter);
app.use("/delete-user", deleteUserRouter);
app.use("/webhook", webhookRouter);

setInterval(async () => {
  const expiredReservations = await Reservation.find({
    status: "pending",
    createdAt: { $lt: Date.now() - 400000 },
  });

  if (expiredReservations) {
    expiredReservations.forEach(async (reservation) => {
      await Reservation.deleteOne({ _id: reservation._id });
    });
  }
}, 400000);

app.use(function (err, req, res, next) {
  const message = err.message || "Internal Server Error";
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening to port ${port}`));

// // (async () => {
// //   await ngrok
// //     .connect({
// //       addr: process.env.PORT || 4000,
// //       authtoken: process.env.NGROK_AUTH_TOKEN,
// //     })
// //     .then((listener) =>
// //       console.log(`Ingress established at: ${listener.url()}`)
// //     );
// // })();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

module.exports = app;
