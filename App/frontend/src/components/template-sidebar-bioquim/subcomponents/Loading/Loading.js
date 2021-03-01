import React, { useEffect, useState } from "react";
import { Spinner, Fade } from "react-bootstrap"
import './Loading.css';

const Loading = () => {
  const [ hide, setHide ] = useState(false);

  useEffect(() => {
    setTimeout(() => {  setHide(true); }, 600);
  }, []);


  return (
      <Fade in={!hide} unmountOnExit={true} timeout={1000}>
        <div className="Loading">
          <Spinner animation="border" className="spinner" variant="light" />
        </div>
      </Fade>
  );
}

export default Loading;
