import React from "react";
import './Info.css';

const Info = props => {
  const { title, description } = props;
  return (
    <div className='Info'>
      <div>
        <h1>{title}</h1>
        <p className="text-justify">{description}</p>
      </div>
    </div>
  )
}

export default Info;
