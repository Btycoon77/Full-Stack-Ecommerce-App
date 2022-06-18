import React, { useState } from "react";
import './Header.css';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../actions/userAction";
import { useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import {useAlert} from 'react-alert';


const UserOptions = ({ user }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const actions = [
    {
      icon: <ListAltIcon />,
      name: "Orders",
      func: orders,
    },
    {
      icon: <PersonIcon />,
      name: "Profile",
      func: account,
    },
    {
      icon: <ExitToAppIcon />,
      name: "Logout",
      func: logoutUser,
    },
  ];

  if (user.role === "user") {
    actions.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }
  function orders() {
    navigate("/orders");
  }

  function logoutUser() {
    dispatch(Logout());
    navigate("/");
    alert.success("logout successfully");
  }

  function account() {
    navigate("/account");
  }

  return (
    <>
    
    <Box  style ={{zIndex:"10"}}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', top: 0, right: 5 }}
        icon={<img
            className="speedDialIcon"
            src ={user.avatar.url?user.avatar.url:"/Profile.png"}
        
        
        />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick = {action.func}
          />
        ))}
      </SpeedDial>
    </Box>
  
    </>
  );
};

export default UserOptions;
