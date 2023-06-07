const sgMail = require("@sendgrid/mail");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({
  path: "./sendgrid.env",
});

app.use(cors());

app.use(express.json());
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.get("/", (_, res) => {
  res.send("Email API service is up and running");
});

app.post("/checkout", (req, res) => {
  const { name, email, cart } = req.body;

  const msg = {
    to: {
      name,
      email,
    },
    from: process.env.SENDGRID_RECIPIENT_EMAIL,
    subject: "Order Confirmation - Your order has been placed!",
    text: "An order has just been submitted we will try to deliver it as soon as possible!",
    html: `
      <h1>Order Confirmation</h1>
      <p>Thank you for your order!</p>
      <p>Order details:</p>
      <ul>
        ${cart
          .map(
            (item) => `
          <li>
            <strong>${item.product.title}</strong> - ${item.quantity} x $${item.product.price} = $${item.totalPrice}
          </li>
        `
          )
          .join("")}
      </ul>
      <p>Total: $${cart.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      )}</p>
      <p>We will try to deliver it as soon as possible!</p>
      
    `,
  };

  sgMail
    .send(msg)
    .then(() => {
      res.json({ message: "Email sent successfully" });
    })
    .catch((error) => {
      res.json({ error });
    });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Orders server is running on port ${port}`);
});
