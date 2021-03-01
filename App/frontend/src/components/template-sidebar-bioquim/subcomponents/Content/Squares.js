import React, {useState, useEffect, useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import './Squares.css';

const Squares = ({images, showFirst=true, parentHeight = 0}) => {
  const [modal, setModal] = useState({ display: "none", image: "", padding: "10%" })
  const [elements, setElements] = useState([])
  const [height, setHeight] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [index, setIndex] = useState(0);

  const squareRef = useRef(null);
  const modalRef = useRef(null);

  const handleOpen = e => {
    let _modal = {...modal};
    _modal.image = (e.target.attributes.style.value.substring(
      e.target.attributes.style.value.lastIndexOf("(") + 1,
      e.target.attributes.style.value.lastIndexOf(")")
    ));
    _modal.image = _modal.image.substring(1, _modal.image.length - 1)
    _modal.display = "block";
    setModal(_modal)

    setTimeout(() => {
      let __modal = {..._modal}
      __modal.padding = ((window.innerHeight - modalRef.current.height) / 2) - 2;
      setModal(__modal)
    }, 50);
  }

  const handleClose = () => {
    let _modal = {...modal};
    _modal.display = "none";
    setModal(_modal)
  }

  useEffect(() => {
    if (Array.isArray(images)) {
      let _images = [...images];
      if (!showFirst) {
        _images = _images.slice(1);
      }

      let _elements = [];
      if (_images.length > 0)
        _elements.push(
        <img
          id={_images[0].id}
          className="square"
          style={{backgroundImage: "url(" + _images[0].image + ")", top: (height * 0) - (index * height)}}
          onClick={handleOpen}
          key={_images[0].id}
          ref={squareRef}
        />);
      for (let i = 1; i < _images.length; i++) {
        _elements.push(
        <img
          id={_images[i].id}
          className="square"
          style={{backgroundImage: "url(" + _images[i].image + ")", top: (height * i) - (index * height)}}
          onClick={handleOpen}
          key={_images[i].id}
        />);
      }

      setElements(_elements)
    }
  }, [images, height, index])

  useEffect(() => {
    setTimeout(() => {
      if (squareRef !== null) {
        if (typeof squareRef.current != "undefined") {
          let _modal = {...modal}
          _modal.padding = ((window.innerHeight - modalRef.current.height) / 2) - 2;
          setModal(_modal)
          setHeight(squareRef.current.offsetHeight + 20);
          let length = images.length
          if (!showFirst)
            length -= 1;
          if (Math.ceil(parentHeight / squareRef.current.offsetHeight) < length)
            setQuantity(Math.ceil(parentHeight / squareRef.current.offsetHeight));
          else
            setQuantity(length);
        }
      }
    }, 150)
  }, [parentHeight])

  useEffect(() => {
  var timerID = setInterval( () => {
    let length = showFirst ? images.length : images.length - 1;
    if (index < length - quantity) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }, 5000 );

  return function cleanup() {
      clearInterval(timerID);
    };
  });


  return (
    <div className="Squares" style={{height: height * quantity}}>
      {elements}
      <div className="modal" style={{display: modal.display, paddingTop: modal.padding }}>
        <span className="close" onClick={handleClose}><AiOutlineClose /></span>
        <img className="modal-content" src={modal.image} ref={modalRef}/>
      </div>
    </div>
  );
}

export default Squares;
