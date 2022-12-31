import React from 'react';
import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs';

const Rating = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const val = i + 0.5;
    let icon;
    if (rating >= i + 1) {
      icon = <BsStarFill />;
    } else if (rating >= val) {
      icon = <BsStarHalf />;
    } else {
      icon = <BsStar />;
    }
    return <span key={i}>{icon}</span>;
  });
  return <div className='rating'>{stars}</div>;
};

export default Rating;
