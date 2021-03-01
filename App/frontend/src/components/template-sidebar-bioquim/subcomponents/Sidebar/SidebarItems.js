import React, { useState, useEffect } from 'react';
import { ListGroup, Collapse } from "react-bootstrap";
import './SidebarItems.css';

const SidebarItems = ({ areas, setAreas, link='/' }) => {

  const [ items, setItems ] = useState([]);

  useEffect(() => {
    let content = [];
    areas.map(area => {
      content.push(
        <ListGroup.Item key={'area' + area.id}>
          <a onClick={() => handleShow(area)} aria-expanded={area.show} className="dropdown-toggle">{area.title}</a>
          <Collapse in={area.show}>
            <ListGroup>
              {area.brands.map(areaBrand => (
                <ListGroup.Item key={'areaBrand' + areaBrand.id}>
                  <a href={'#area' + area.id}>{areaBrand.title}</a>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Collapse>
        </ListGroup.Item>
      )
    })
    setItems(content)
  }, [areas])

  const handleShow = area => {
    let _areas = [...areas];
    for (var i = 0; i < _areas.length; i++) {
      if (area === _areas[i]) {
          _areas[i].show = !_areas[i].show;
        return setAreas(_areas);
      }
    }
  }

  return (
    <div className='SidebarItems'>
      { items }
    </div>
  )
}

export default SidebarItems;
