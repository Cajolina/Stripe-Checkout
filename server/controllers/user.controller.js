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
    const existingUserInStripe = await stripe.customers.search({
      query: `email:\'${req.body.email}\'`,
    });

    if (existingUserInStripe.data.length > 0) {
      console.log("User already exists");
      return res.status(403).json("User already exists");
    }
    const dataInput = req.body;
    const hashedPassword = await bcrypt.hash(dataInput.password, 10);

    // Läs användardata från jsonfilen
    const data = await fs.promises.readFile(filePath);
    const users = JSON.parse(data);

    // Kontrollera om användaren redan finns
    const userExists = users.find((user) => user.email === dataInput.email);
    if (userExists) {
      console.log("Email already exists in json");
      return res.status(403).send("Email already exists");
    }

    // Skapa en ny användare
    const customer = await stripe.customers.create({
      email: dataInput.email,
      name: dataInput.name,
    });

    const newUser = {
      id: customer.id,
      email: customer.email,
      name: customer.name,
      password: hashedPassword,
    };

    // Lägg till den nya användaren i listan och spara till filen
    users.push(newUser);
    await fs.promises.writeFile(filePath, JSON.stringify(users, null, 2));
    req.session = newUser;
    return res.status(201).send(newUser);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("An error occurred");
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
      const userInDb = users.find((user) => user.email === email);

      if (!userInDb || !(await bcrypt.compare(password, userInDb.password))) {
        return res.status(401).json("Wrong password or username");
      }

      if (req.session.id) {
        return res.status(200).json(userInDb);
      }
      req.session = userInDb;

      res.status(200).json(userInDb);
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function logout(req, res) {
  if (!req.session.id) {
    return res.status(400).json("Cannot logout when you are not logged in");
  }
  req.session = null;
  res.status(204).json(null);
}

async function authorize(req, res) {
  if (!req.session.id) {
    return res.status(401).json("You are not logged in");
  }

  res.status(200).json(req.session);
}

module.exports = { getAllUsers, registerUser, login, authorize, logout };
