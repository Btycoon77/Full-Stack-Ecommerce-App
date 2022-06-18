import React from "react";
import styled from "styled-components";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
import { mobile } from "./responsive";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { dispatch, useSelector } from "react-redux";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;
const Left = styled.div`
  flex: 1;
`;
const Center = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-evenly;
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;
const SearchContainer = styled.div`
  display: flex;
  border: 0.5px solid lightgray;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;
const Padding = styled.div`
  cursor: pointer;
  margin-left: 25px;
`;

const style = {
  textdecoration: "none",
};

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <>
      <Container>
        <Wrapper>
          <Left>
            <Language>EN</Language>
          </Left>

          <Center>
            <MenuItem>
              <Link style={style} to="/">
                HOME
              </Link>
            </MenuItem>
            <MenuItem>
              <Link style={style} to="/products">
                PRODUCTS
              </Link>
            </MenuItem>
            <MenuItem>
              {" "}
              <Link to="/about">ABOUT US</Link>{" "}
            </MenuItem>
            <MenuItem>
              <Link to="/contact"> CONTACT US</Link>
            </MenuItem>
          </Center>
          <Right>
            <MenuItem>
              <Badge badgeContent={cartItems.length} color="primary">
                <Link to="/cart">
                  <ShoppingCartOutlinedIcon />
                </Link>
              </Badge>
            </MenuItem>
            <Padding>
              <Link to="/search">
                <SearchSharpIcon />
              </Link>
            </Padding>
            <Padding>
              {" "}
              <Link to="/login">
                <AccountCircleIcon />
              </Link>
            </Padding>
          </Right>
        </Wrapper>
      </Container>
    </>
  );
};

export default Navbar;
