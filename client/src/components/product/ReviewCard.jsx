import { Rating } from '@mui/material'
import React from 'react'
const profileImg = require('../../images/Profile.png')
const ReviewCard = ({review}) => {

const options = {
    value:review.rating,
    readOnly:true,
    precision:0.5
};


  return (
    <div className="reviewCard">
        <img src={profileImg} alt="profileImg" />
        <p>{review.name}</p>
        <Rating {...options}   />
        <span className="reviewCardContent">{review.comment}</span>
    </div>
  )
}

export default ReviewCard