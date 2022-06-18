import React from "react";
import { useSelector } from "react-redux";
import { Route, useNavigate } from "react-router-dom";




const ProtectedRoute = ({ isAdmin, element: Component, ...rest }) => {
  const navigate = useNavigate();
  const { loading, isAuthenticated, user } = useSelector(
    (state) => state,
    user
  );
  return (
    <>
      {loading == false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated == false) {
              navigate("/login");
            }
            if (isAdmin === true && user.role !== "admin") {
              navigate("/login");
            }
            return <Component {...props} />;
          }}
        />
      )}
    </>
  );
};

export default ProtectedRoute;
