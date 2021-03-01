import React from "react";
import './SidebarCollapse.css';

const SidebarCollapse = (props) => {
  const { active, setActive } = props;
  return (
    <button type="button" className={"SidebarCollapse" + active} onClick={ e => { active === "" ? setActive(" active") : setActive("") }}>
        <span></span>
        <span></span>
        <span></span>
    </button>
  )
}

export default SidebarCollapse;
