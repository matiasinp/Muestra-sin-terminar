import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'
const Dashboard = ({list, link="/"}) => {
  let counter = 0;
  let content = list.map(object => {
      counter++;
      if (counter <= 2)
        return (
          <Link className="overlay" key={object.id} to={link + object.id}>
            <img style={{backgroundImage: `url(${object.image})`}} />
            <div className="caption">
              <h5>{object.title}</h5>
              <p>{object.description}</p>
            </div>
          </Link>
        );
      else
        return (
          <Link className="overlay" key={object.id} to={link + object.id}>
            <img style={{backgroundImage: `url(${object.image})`}} />
            <div className="caption">
              <h5>{object.title}</h5>
            </div>
          </Link>
        );
    }
  )

  return (
    <div className="Dashboard">
      {content}
    </div>
  );
}

export default Dashboard;
