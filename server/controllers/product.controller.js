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
    image: product.images,
  }));
  res.status(200).json(products);
}

module.exports = { getAllProducts };
