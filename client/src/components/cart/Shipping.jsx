import React, { useState } from "react";
import './Shipping.css';
import  HomeIcon  from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import PinDropIcon from "@mui/icons-material/PinDrop";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import { Country, State } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { saveShippingInfo } from "../actions/cartAction";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";

const Shipping = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone number should be 10 digits long");
      return;
    }
    dispatch(
      saveShippingInfo({
        address,
        city,
        state,
        country,
        pinCode,
        phoneNo,
      })
    );

    navigate("/order/confirm");
  };

  return (
    <>
    <CheckoutSteps activeStep={0} />
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shopping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={(e) => shippingSubmit(e)}
          >
            <div>
              <HomeIcon />

              <input
              
                type="text"
                name="address"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required/>
            </div>

            <div>
              <LocationCityIcon />
              <input
             
                type="text"
                name="city"
                id="city"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required/>
            </div>

            <div>
              <PinDropIcon />
              <input
                type="text"
                name="pin"
                id="pin"
                placeholder="Pin code"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                required/>
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                name="phone"
                id="phone"
                placeholder="Phone no"
                value={phoneNo}
                size="10"
                onChange={(e)=>setPhoneNo(e.target.value)}
                required/>
            </div>

            <div>
              <PublicIcon />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => {
                    return (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>

            {/*  STATE */}
            {country && (
              <div>
                <TransferWithinAStationIcon />

                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => {
                      return (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            )}
            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
             
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
