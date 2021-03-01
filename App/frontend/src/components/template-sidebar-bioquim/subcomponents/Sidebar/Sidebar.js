import React from "react";
import SidebarItems from "./SidebarItems";
import { Image, ListGroup, Container } from "react-bootstrap"
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import { ImPhone } from 'react-icons/im';
import { GrInstagram } from 'react-icons/gr';
import { SiFacebook } from 'react-icons/si';
import './Sidebar.css';

const Sidebar = props => {
  const { data, display } = props;

  return (
    <div className='Sidebar'>
    <div className={"sidebarOverlay" + display.active}/>
    <div className={'sidebar' + display.active}>
      <Scrollbars  style={{ width: "100%", height: "100%" }} autoHide autoHideTimeout={500} autoHideDuration={200}>
        <div className="sidebar-header">
          <Link to="/">
            <Image src="/imgs/logo.png" fluid/>
          </Link>
        </div>
          <ListGroup className="components">
            <p style={{margin: 0}}>{display.subtitle}</p>
            <SidebarItems areas={data.areas} setAreas={data.setAreas} />
          </ListGroup>
          <Container>
            {"facebook" in display.footer && <><a href={display.links.facebook}><SiFacebook /><p>{display.footer.facebook}</p></a><br/></>}
            {"instagram" in display.footer && <><a href={display.links.instagram}><GrInstagram /><p>{display.footer.instagram}</p></a><br/></>}
            {"tel" in display.footer && <><a href={"tel:+" + display.links.tel}><ImPhone /><p>{display.footer.tel}</p></a><br/></>}
            {"name" in display.footer && <p>{display.footer.name}</p>}
            {"adress" in display.footer && <p>{display.footer.adress}</p>}
          </Container>
        </Scrollbars>
      </div>
    </div>
  )
}

export default Sidebar;
