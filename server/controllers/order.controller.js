const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../db/orders.json");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const CLIENT_URL = "http://localhost:5173";

async function createCheckoutSession(req, res) {
  console.log("req.body:", req.body);
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.map((item) => {
        return {
          price: item.product,
          quantity: item.quantity,
        };
      }),
      customer: req.session.id,
      mode: "payment",
      allow_promotion_codes: true,
      success_url: `${CLIENT_URL}/confirmation`,
      cancel_url: CLIENT_URL,
    });

    res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Kunde inte skapa checkout session");
  }
}

async function verifySession(req, res) {
  try {
    console.log(typeof req.body.sessionId);
    const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ verified: false });
    }

    const line_items = await stripe.checkout.sessions.listLineItems(
      req.body.sessionId
    );

    const order = {
      created: new Date(session.created * 1000).toISOString().split("T")[0],
      customer: {
        name: session.customer_details.name,
        email: session.customer_details.email,
      },
      products: line_items.data.map((item) => {
        return {
          product: item.description,
          quantity: item.quantity,
          price: item.price.unit_amount / 100,
          totalPrice: (item.price.unit_amount / 100) * item.quantity,
        };
      }),
    };
    console.log(order);
    //Save order to json
    fs.readFile(filePath, (err, data) => {
      if (err) {
        return res.status(404).send("Couldn't get order");
      }

      const orders = JSON.parse(data);
      orders.push(order);

      fs.writeFile(filePath, JSON.stringify(orders, null, 2), (err) => {
        if (err) {
          console.log(err);
          return res.status(404).send("Couldn't add order");
        }
        return res.status(201).send(orders);
      });
    });

    res.status(200).json({ verified: true });
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { createCheckoutSession, verifySession };
