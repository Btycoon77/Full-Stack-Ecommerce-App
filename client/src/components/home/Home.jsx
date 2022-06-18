import React from "react";
import "./home.css";
import Product from "./ProductCard";
import Metadata from "../layout/metadata";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { getProduct } from "../actions/productAction";
import Loader from "../layout/loader/loader";
import { useAlert } from "react-alert";


const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  console.log("from home page",products);

  React.useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProduct());
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title={"ECOMMERCE"} />
          <div className="banner">
            <h1>FIND AMAZING PRODUCT BELOW</h1>
            <a href="#container">
              <button>Scroll</button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Product</h2>

          <div className="container">
            {products &&
              products.map((product) => {
                return <ProductCard key={product._id} product={product} />;
              })}
            
          </div>
        </>
      )}
    </>
  );
};

export default Home;
