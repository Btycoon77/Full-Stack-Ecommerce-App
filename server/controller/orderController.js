const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");

// create new order;

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  Order.init();
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

//  get Single order;

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  Order.init();
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
  // what populate basically does is instead of getting user id it sends name and email of the user;

    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
  
    res.status(200).json({
      success: true,
      order,
    });
  });

  
// get logged in user  Orders

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  Order.init();
    const orders = await Order.find({ user: req.user._id });
    //  req.user._id == it basically retrives info from the logged in user --whatever is written in postman as a requiest (login credentials)
    
    res.status(200).json({
      success: true,
      orders,
      id:req.user._id
    });
  });

//   get all orders for ----admin;


exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  Order.init();
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order)=>{
        totalAmount += order.totalPrice
    });
  
    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  });


  // update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  Order.init();
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
  
    if (order.orderStatus === "Delivered") {
      return next(new ErrorHandler("You have already delivered this order", 400));
    }
  
    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status;
  
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
  
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  });
  
  async function updateStock(id, quantity) {
    const product = await Product.findById(id);
  
    product.Stock -= quantity;
  
    await product.save({ validateBeforeSave: false });
  }
  
  // delete Order -- Admin
  exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    Order.init();
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
  
    await order.remove();
  
    res.status(200).json({
      success: true,
    });
  });

