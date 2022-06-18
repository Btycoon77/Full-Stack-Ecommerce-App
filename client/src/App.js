import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import webfont from "webfontloader";
import Footer from "./components/layout/footer/Footer";
import Home from "./components/home/Home";
import ProductDetails from "./components/product/productDetails";
import Products from "./components/product/Products";
import Search from "./components/product/Search";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import LoginSignUp from "./components/User/LoginSignup";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./components/actions/userAction";
import UserOptions from "./components/layout/header/UserOptions";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";
import { Elements } from "@stripe/react-stripe-js";
import MyOrders from "./components/order/MyOrder";
import OrderDetails from "./components/order/OrderDetails";
import Contact from "./components/layout/contact/Contact";
import About from "./components/layout/about/About";
import Dashboard from "./components/admin/Dashboard";
import NotFound from "./components/layout/NotFound/NotFound";
import ProductReviews from "./components/admin/ProductReview";
import UsersList from "./components/admin/UsersList";
import ProcessOrder from "./components/admin/ProcessOrder";
import OrderList from "./components/admin/OrderList";
import UpdateProduct from "./components/admin/UpdateProduct";
import NewProduct from "./components/admin/NewProduct";
import ProductList from "./components/admin/ProductList";
import UpdateUser from "./components/admin/UpdateUser";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    dispatch(loadUser());
    getStripeApiKey();
  }, [dispatch]);

  return (
    <>
      <Router>
        <Navbar />
        {isAuthenticated && <UserOptions user={user} />}
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Routes>
              <Route path="/process/payment" element={<Payment />} />
            </Routes>
          </Elements>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />

          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />

          <Route exact path="/password/forgot" element={<ForgotPassword />} />

          <Route
            exact
            path="/password/reset/:token"
            element={<ResetPassword />}
          />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />

          <Route path="/success" element={<OrderSuccess />} />

          <Route path="/orders" element={<MyOrders />} />

          <Route path="/order/:id" element={<OrderDetails />} />

              {/*    ADMIN ROUTES */}

          <Route path="/admin/dashboard" element={<Dashboard />} />

          <Route exact path="/admin/products" element={<ProductList />} />
          <Route exact path="/admin/product" element={<NewProduct />} />

          <Route exact path="/admin/product/:id" element={<UpdateProduct />} />
          <Route
            exact
            path="/admin/orders"
            
            element={<OrderList />}
          />

          <Route exact path="/admin/order/:id" element={<ProcessOrder />} />
          <Route exact path="/admin/users" element={<UsersList />} />

          <Route exact path="/admin/user/:id" element={<UpdateUser />} />

          <Route exact path="/admin/reviews" element={<ProductReviews />} />

          <Route
            component={
              window.location.pathname === "/process/payment" ? null : (
                <NotFound />
              )
            }
          />
        </Routes>

        <Footer />
      </Router>
    </>
  );
};

export default App;
