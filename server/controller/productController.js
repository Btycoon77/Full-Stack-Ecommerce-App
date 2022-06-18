const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const AsyncError = require("../middlewares/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const catchAsyncErrors = require("../middlewares/catchAsyncError");

// create Product

exports.createProduct = async (req, res, next) => {
  try {
    // req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(200).json(product);
    next();
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

// get one product -- PRODUCT DETAILS

exports.getOneProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(400).json("product not found");
    }
    res.status(200).json(product);
  } catch (error) {
    // return next(new ErrorHandler("Internal server error ", 500));
    res.status(500).json(error);
  }
};

// get All product

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  // return next(new ErrorHandler("This is temporary error",500));
  const resultPerPage = 8;
  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query.clone();

  res
    .status(200)
    .json({ products, productCount, resultPerPage, filteredProductsCount });
});


// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});


// update product: Admin

exports.updateProduct = async (req, res) => {
  try {
    let product = Product.findById(req.params.id);
    if (!product) {
      return res.status(500).json("product not found");
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

//  delete product

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(500).json("product not found");
    }

    res.status(200).json("product deleted succesfully");
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

// create New review or update the review;

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  // console.log(product);
  // console.log("hello product_reviews",product.reviews);
  const isReviewed = product.reviews.find((rev) => rev.user == req.user._id);

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user == req.user._id)
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter((rev) => rev._id !== req.query.id);

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
