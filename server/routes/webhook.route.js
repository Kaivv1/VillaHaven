/* eslint no-undef: */
const express = require("express");
const {
  handleFailedPayment,
  handleSuccessfullPayment,
} = require("../utils/stripeHelpers");
const Stripe = require("stripe");
const webhookRouter = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
webhookRouter.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = await stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    const sessionId = event.data.object.id;
    switch (event.type) {
      case "checkout.session.completed":
        await handleSuccessfullPayment(sessionId);
        break;
      case "checkout.session.async_payment_failed":
        await handleFailedPayment(sessionId);
        break;
      case "payment_intent.payment_failed":
        await handleFailedPayment(sessionId);
        break;
      case "payment_intent.canceled":
        await handleFailedPayment(sessionId);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ msg: "Successfully Handled payment" });
  }
);

module.exports = webhookRouter;
