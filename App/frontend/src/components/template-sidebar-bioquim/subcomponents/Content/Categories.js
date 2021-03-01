import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { Row, Col, Button } from "react-bootstrap";
import { Scrollbars } from 'react-custom-scrollbars';
import { FiExternalLink } from "react-icons/fi";
import { useWindowSize } from "./../../Template";
import CategoriesItems from "./CategoriesItems";
import { v4 as uuidv4 } from 'uuid';
import useResizeAware from 'react-resize-aware';
import './Categories.css';

//list: lista a mapear en las cards
//objectPrefix: prefijo para las ids
//listObject: objeto a mapear dentro de la lista
//title: título
//defaultText: texto por defecto si no se encuentran resultados
//linkItem: prefijo del link de la card
//linkButton: prefijo del link del botón
//cap: -1 desactivado
//cap: 0 limita el contenido al ancho de la pantalla
//cap: 1+ limita el conteido a la cantidad establecida (en lineas)
const Categories = ({
  list,
  objectPrefix,
  listObject,
  title,
  defaultText,
  linkItem,
  linkButton,
  useTitle = true,
  cap = 0,
  horizontal = false,
  forceHorizontal = false
}) => {

  const [categories, setCategories ] = useState([]);
  const [quantity, setQuantity ] = useState(4);

  const ref = useRef(null);

  const [resizeListener, sizes] = useResizeAware();

  useEffect(() => {

    let width = window.innerWidth;
    let height = window.innerHeight;
    try {
      width = ref.current.offsetWidth;
      height = ref.current.offsetHeight;
    } catch (e) {
    }

    let _list = []
    if (Array.isArray(list)) {
      _list = [...list];
    } else {
      _list = [{...list}];
    }
    if (!"id" in _list) {
      _list.id = 0;
    }
    if (!"title" in _list) {
      _list.title = "";
    }
    _list.map(object => {
      if (!Array.isArray(object[listObject])) {
        object[listObject] = [];
      }
    });

    if (forceHorizontal)
      horizontal = true;

    if (!horizontal && !forceHorizontal) {
      if (window.innerWidth < 992) {
        if (window.innerWidth > window.innerHeight)
          horizontal = true;
        else if (window.innerWidth / window.innerHeight >= 3/4)
          horizontal = true;
      }
    }

    let content = [];
    let elements = [];
    let rest = 0;
    setQuantity(4);
    if (width < 720)
      setQuantity(1);
    else if (width < 950) {
      if (horizontal)
        setQuantity(1);
      else
        setQuantity(2);
    }
    else if (width < 1200) {
      if (horizontal)
        setQuantity(2);
      else
        setQuantity(3);
    }
    else if (horizontal)
        setQuantity(2);

    _list.map(object => {
      elements = [];
      let length
      if (cap < 0) {
        length = object[listObject].length;
      }
      else if (cap == 0) {
        rest = object[listObject].length % quantity;
        if (object[listObject].length <= rest)
          rest = 0;
        length = object[listObject].length - rest;
      } else {
        if (cap * quantity <= object[listObject].length)
          length = cap * quantity;
        else
          length = object[listObject].length;
      }
      if (object[listObject].length <= 0) {
        elements.push(<Col xs={12}><p>{defaultText}</p></Col>);
      } else {
        for (let i = 0; i < length; i++) {
          elements.push(<CategoriesItems
            object = {object[listObject][i]}
            linkItem = {linkItem}
            quantity = {quantity}
            horizontal = {horizontal}
            width = {window.matchMedia('(min-width: 992px)').matches
                      ? (((sizes.width / quantity) - (((30 * quantity) - 30) / quantity)) - 2)
                      : window.innerWidth - 30}
            key={uuidv4()}
          />);
        }
      }
      content.push(
        useTitle
        ?
          <div id={objectPrefix + object.id} key={uuidv4()}>
            <div className="header">
              <h3>{object.title}</h3>
              {cap >= 0 && <Link to={linkButton + object.id}><Button>Ver más</Button></Link>}
            </div>
            <Row>{elements}</Row>
          </div>
        :
          <div id={objectPrefix + object.id} key={uuidv4()}>
            <Row>{elements}</Row>
          </div>
      );
    });

    setCategories(content);
  }, [list, sizes, useWindowSize()]);

  return (
    <div className='Categories' ref={ref}>
      {window.matchMedia('(min-width: 992px)').matches && resizeListener}
      <div>
        <h2>{title}</h2>
      </div>
      {categories}
    </div>
  )
}

export default Categories;
