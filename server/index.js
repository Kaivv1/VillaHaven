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
  deleteImageRouter,
} = require("./routes/s3Bucket.route");

const app = express();

app.use(passport.initialize());
app.use(
  cors({
    origin: ["https://villa-haven.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
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

app.use("/home", router);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/user", userRouter);
app.use("/update-user", updateUserRouter);
app.use("/generate-OTP", generateOTPRouter);
app.use("/verify-OTP", verifyOTPRouter);
app.use("/reset-password", resetPassRouter);
app.use("/send-email", sendEmailRouter);
app.use("/resend-OTP", resendOTPRouter);
app.use("/secret", secretKeyRouter);
app.use("/delete-OTP", deleteOTPRouter);
app.use("/get-villas", getVillasRouter);
app.use("/upload-villa", uploadVillasRouter);
app.use("/set-favorite-villa", setFavoriteVillaRouter);
app.use("/get-user-favorites", getUserFavoriteVillasRouter);
app.use("/remove-favorite-villa", deleteFavoriteVillaRouter);
app.use("/get-user", userByTokenRouter);
app.use("/upload-testimonial", uploadTestimonialRouter);
app.use("/get-testimonials", getTestimonialsRouter);
app.use("/create-FAQ", createFAQRouter);
app.use("/get-FAQs", getFAQsRouter);
app.use("/get-app-email", secretEmailRouter);
app.use("/villa", getVillaByIdRouter);
app.use("/update-villa", updateVillaByIdRouter);
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
app.use("/delete-user-avatar", deleteImageRouter);
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

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

module.exports = app;
