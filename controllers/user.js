import { asyncError } from "../middlewares/errorMiddleware.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

/* GET my profile */
export const myProfile = (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

/* Logout user */
export const logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);

    res.clearCookie("connect.sid", {
      secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: process.env.NODE_ENV === "development" ? false : true,
      sameSite: process.env.NODE_ENV === "development" ? false : "none",
    });
    res.status(200).json({
      message: "Logged Out",
    });
  });
};

/* GET all users by ADMIN */
export const getAdminUsers = asyncError(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    success: true,
    users,
  });
});

/* GET Stats by ADMIN */
export const getAdminStats = asyncError(async (req, res, next) => {
  const usersCount = await User.countDocuments();

  const orders = await Order.find({});

  const processingOrder = orders.filter((i) => i.orderStatus === "Processing");
  const shippedOrder = orders.filter((i) => i.orderStatus === "Shipped");
  const deliveredOrder = orders.filter((i) => i.orderStatus === "Delivered");

  let totalIncome = 0;

  orders.forEach((i) => {
    totalIncome += i.totalAmount;
  });

  res.status(200).json({
    success: true,
    usersCount,
    ordersCount: {
      total: orders.length,
      processing: processingOrder.length,
      shipped: shippedOrder.length,
      delivered: deliveredOrder.length,
    },
    totalIncome,
  });
});
