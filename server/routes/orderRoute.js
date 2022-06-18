const express = require("express");
const {
  newOrder,
  myOrders,
  getSingleOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controller/orderController");

const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.post("/order/new", isAuthenticatedUser, newOrder);

router.get("/order/:id", isAuthenticatedUser, getSingleOrder);

router.get("/orders/myOrders", isAuthenticatedUser, myOrders);

router.get(
  "/admin/orders",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllOrders
);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
