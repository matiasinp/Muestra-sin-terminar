import React, { useState, useEffect, useLayoutEffect } from "react";
import Sidebar from "./subcomponents/Sidebar/Sidebar";
import NavbarTop from "./subcomponents/Navbar/NavbarTop";
import SidebarCollapse from "./subcomponents/Sidebar/SidebarCollapse";
import Loading from "./subcomponents/Loading/Loading";
import Home from "./Home";
import News from "./News";
import New from "./New";
import Contact from "./Contact";
import AboutUs from "./AboutUs";
import AreaInfo from "./AreaInfo";
import AreaBrandInfo from "./AreaBrandInfo";
import MethodInfo from "./MethodInfo";
import { Link, Switch, Route } from 'react-router-dom';
import ScrollToTop from './Logic/ScrollToTop';

import './Template.css';

function debounce(fn, ms) {
  let timer
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  };
}

export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const updateSize = debounce(() => {
      setSize([window.innerWidth, window.innerHeight]);
    }, 200)

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const Template = (props) => {
  const { data, display } = props;

  const [lastWidth, setLastWidth] = useState(-1);

  useEffect(() => {
    if ((lastWidth >= 992 && window.innerWidth < 992) || (lastWidth < 992 && window.innerWidth >= 992) || lastWidth < 0) {
      if (!window.matchMedia('(min-width: 992px)').matches)
        display.setActive(" active");
      else
        display.setActive("");
      setLastWidth(window.innerWidth);
    }

  }, [useWindowSize()]);

  return (
    <div className="Template">
      <Loading />
      <Sidebar data={data} display={display} />
      <div className="content">
        <NavbarTop active={display.active}>
          <SidebarCollapse active={display.active} setActive={display.setActive} />
        </NavbarTop>
        <Switch>
          <Route path={"/areas/marcas/metodos/:methodId"} render={props => <MethodInfo {...props} />} />
          <Route path={"/areas/marcas/:areaBrandId"} render={props => <AreaBrandInfo areas={data.areas} {...props} />} />
          <Route path={"/areas/:areaId"} render={props => <AreaInfo areas={data.areas} {...props} />} />

          <Route exact path="/contacto/">
            <Contact />
          </Route>
          <Route exact path="/institucional/">
            <AboutUs />
          </Route>
          <Route path={"/noticias/:newId"} render={props => <New news={data.news} {...props} />} />
          <Route exact path="/noticias/">
            <News news={data.news} />
          </Route>

          <Route exact path="/">
            <Home areas={data.areas} news={data.news} />
          </Route>
        </Switch>
        <ScrollToTop />
      </div>
    </div>
  );
}

export default Template;
