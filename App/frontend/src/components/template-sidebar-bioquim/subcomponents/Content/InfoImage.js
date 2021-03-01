import React from "react";
import './InfoImage.css';

const InfoImage = props => {
  const { title, description, image } = props;
  return (
    <div className='InfoImage'>
      <div>
        <h1>{title}</h1>
        <p className="text-justify">{description}</p>
        <img src={image} className="d-none d-lg-block" />
      </div>
    </div>
  )
}

export default InfoImage;
