/* eslint no-undef: */
const express = require("express");
const { auth, verifyAuth } = require("../controllers/auth.controller");
const Reservation = require("../Models/Reservation");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const secretKeyRouter = express.Router();
const secretEmailRouter = express.Router();
const secretStripeKeyRouter = express.Router();
const clientSecretRouter = express.Router();

secretKeyRouter.get("/", async (req, res) => {
  const secret_value = process.env.TEMP_SECRET;

  return res.status(201).json({ secret_value });
});

secretEmailRouter.get("/", async (req, res) => {
  const app_email = process.env.app_email;

  return res.status(201).json({ app_email });
});

secretStripeKeyRouter.get("/", async (req, res) => {
  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

  res.status(200).json({ STRIPE_SECRET_KEY });
});

clientSecretRouter.post("/", auth, verifyAuth, async (req, res) => {
  const { villa, reservation } = req.body;
  const { userId } = req.user;

  const lineItems = [
    {
      price_data: {
        currency: "usd",
        product_data: {
          name: villa.villaName,
          images: [villa.picture],
        },
        unit_amount: Math.round(villa.price * 100),
      },
      quantity: villa.days,
    },
  ];

  const newReservation = new Reservation({
    userId,
    ...reservation,
    status: "pending",
  });
  await newReservation.save();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `https://villa-haven.vercel.app/#/reservation/${newReservation._id}/success`,
    cancel_url: "https://villa-haven.vercel.app/reservation/failed",
  });

  await Reservation.updateOne(
    { _id: newReservation._id },
    { stripeSessionId: session.id }
  );

  res.json({ id: session.id });
});

module.exports = {
  secretKeyRouter,
  secretEmailRouter,
  secretStripeKeyRouter,
  clientSecretRouter,
};
