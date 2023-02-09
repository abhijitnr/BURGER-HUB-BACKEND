import express from "express";
import {
  getAdminOrders,
  getOrderDetails,
  myOrders,
  paymentVerification,
  placeOrder,
  placeOrderOnline,
  processingOrder,
} from "../controllers/order.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const orderRoutes = express.Router();

/* CREATE ORDER ( COD ) */
orderRoutes.post("/create", isAuthenticated, placeOrder);

/* CREATE ORDER ( ONLINE ) */
orderRoutes.post("/create/online", isAuthenticated, placeOrderOnline);

/* PAYMENT VERIFICATION */
orderRoutes.post("/payment/verification", isAuthenticated, paymentVerification);

/* MY ORDERS */
orderRoutes.get("/myorders", isAuthenticated, myOrders);

/* GET ORDER DETAILS */
orderRoutes.get("/details/:id", isAuthenticated, getOrderDetails);

/* GET ADMIN ORDERS ( admin authorize middleware ) */
orderRoutes.get(
  "/admin/orders",
  isAuthenticated,
  authorizeAdmin,
  getAdminOrders
);

/* GET ADMIN ORDER DETAILS (Processing) ( admin authorize middleware ) */
orderRoutes.get(
  "/admin/order/:id",
  isAuthenticated,
  authorizeAdmin,
  processingOrder
);

export default orderRoutes;
