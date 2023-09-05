const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../db/users.json");
const bcrypt = require("bcrypt");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

function getAllUsers(req, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(404).send("Couldn't get users");
    }
    const users = JSON.parse(data);
    res.status(200).send(users);
    return;
  });
}

async function registerUser(req, res) {
  try {
    const customer = await stripe.customers.create({
      email: req.body.email,
      name: req.body.name,
    });
    console.log(customer);

    const dataInput = req.body;
    const hashedPassword = await bcrypt.hash(dataInput.password, 10);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.status(404).send("Couldn´t register user");
        return;
      }
      const users = JSON.parse(data);
      const user = users.find((user) => user.email == req.params.email);
      if (user) {
        res.status(404).send("Email already exists");
      }

      const newUser = {
        id: customer.id,
        email: customer.email,
        name: customer.name,
        password: hashedPassword,
      };
      users.push(newUser);

      fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
        if (err) {
          console.log(err);
          res.status(404).send("Couldn´t write to file");
        }
        res.status(201).send(users);
      });
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    fs.readFile(filePath, async (err, data) => {
      if (err) {
        return res.status(500).json("An error occurred");
      }
      const users = JSON.parse(data);
      const user = users.find((user) => user.email === email);

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json("Wrong password or username");
      }

      req.session = user;
      res.status(200).json(user);
    });
  } catch (error) {
    console.log(error.message, "Det va inte bra ");
  }
}

module.exports = { getAllUsers, registerUser, login };
