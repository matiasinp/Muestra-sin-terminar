import React, { useEffect, useState } from "react";
import Info from "./subcomponents/Content/Info";
import Categories from "./subcomponents/Content/Categories";

const AreaInfo = ({areas, match}) => {
  const { params: { areaId } } = match;
  const [ area, setArea ] = useState({})

  useEffect(() => {
    for (let i = 0; i < areas.length; i++) {
      if (areaId == areas[i].id) {
        setArea(areas[i])
        break;
      }
    }
  }, [areas])

  return (
    <div className="AreaInfo">
      <Info title={area.title} description={area.description} />
      <Categories
        list={area}
        listObject={"brands"}
        listPrefix={"area"}
        title={"Marcas"}
        defaultText={"No se encuentran marcas"}
        linkItem={"/areas/marcas/"}
        useTitle={false}
        cap={-1}
      />
    </div>
  );
}

export default AreaInfo;
