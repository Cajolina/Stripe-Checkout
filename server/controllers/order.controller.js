const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../db/orders.json");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const CLIENT_URL = "http://localhost:5173";

// const ordersData = fs.readFileSync(filePath, 'utf-8');
// const orders = JSON.parse(ordersData);

async function createCheckoutSession(req, res) {
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
        const price = item.price.unit_amount / 100;
        const quantity = item.quantity;
        const totalPrice = price * quantity;

        return {
          product: item.description,
          quantity: item.quantity,
          price: item.price.unit_amount / 100,
          totalPrice: (item.price.unit_amount / 100) * item.quantity,
        };
      }),
      totalOrderAmount: line_items.data.reduce((total, item) => {
        const price = item.price.unit_amount / 100;
        const quantity = item.quantity;
        return total + price * quantity;
      }, 0),
    };

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
        return res.status(200).json({ verified: true });
      });
    });
  } catch (error) {
    console.error(error.message);
  }
}

async function getOrder(req, res) {
  try {
    const ordersData = fs.readFileSync(filePath, "utf-8");
    const orders = JSON.parse(ordersData);
    const userEmail = req.session.email;

    const order = orders.filter((order) => order.customer.email === userEmail);

    if (!order) {
      return res.status(404).json("Order not found");
    }

    res.status(200).json(order);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createCheckoutSession, verifySession, getOrder };
