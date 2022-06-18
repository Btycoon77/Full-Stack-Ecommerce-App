import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Typography } from '@mui/material';
import "./OrderSuccess.css"
import {Link} from 'react-router-dom';
const OrderSuccess = () => {
  return (
  <>
  <div className="orderSuccess">
      <CheckCircleIcon/>
      <Typography>Your order has been placed successfully</Typography>
      <Link to = "/orders">View orders</Link>
  </div>
  </>
  )
}

export default OrderSuccess