import app from "./app.js";
import { connectDB } from "./config/database.js";
import Razorpay from "razorpay";

connectDB();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

app.get("/", (req, res, next) => {
  res.send(`<h1>WELCOME TO BURGER-HUB BACKEND</h1>`);
});

// Listen server
app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT}, in ${process.env.NODE_ENV} MODE`
  );
});
