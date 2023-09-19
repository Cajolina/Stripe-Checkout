require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function getAllProducts(req, res) {
  const stripeProducts = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = stripeProducts.data.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.default_price.unit_amount,
    currency: product.default_price.currency,
    image: product.images,
    default_price: product.default_price.id,
  }));
  res.status(200).json(products);
}

module.exports = { getAllProducts };
