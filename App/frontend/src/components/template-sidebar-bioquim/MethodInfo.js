import React, { useEffect, useState } from "react";
import InfoImage from "./subcomponents/Content/InfoImage";
import Categories from "./subcomponents/Content/Categories";
import axios from "axios";
import { useWindowSize } from "./Template";

const MethodInfo = ({match}) => {
  const { params: { methodId } } = match;
  const [ method, setMethod ] = useState({});
  const [ display, setDisplay ] = useState({});

  useEffect(() => {
    if(Object.entries(method).length > 0) {
      let aux = JSON.parse(JSON.stringify(method));

      aux.products = aux.products.map(product => {
        if (product.description == null)
          product.description = "Sin descripción"
        if (window.matchMedia('(max-width: 991px)').matches && window.innerHeight > window.innerWidth)
          product.description = [<><b>Código: {product.code}</b></>]
        else
          product.description = [<><b>Código: {product.code}</b><br/>{product.description}</>]
        return product;
      })

      setDisplay(aux);
    }
  }, [method, useWindowSize()]);

  useEffect(() => {
    const fetchData = async () => {
      const result1 = await axios(
        'http://localhost:8000/api/methods/' + methodId,
      );
      let aux = result1.data;
      const result2 = await axios(
        'http://localhost:8000/api/products/?fk=' + methodId,
      );
      aux.products = result2.data;
      aux.products.sort((a, b) => {
        let Diacritics = require('diacritic');

        let keyA = Diacritics.clean(a.title);
        let keyB = Diacritics.clean(b.title);
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });

      setMethod(aux)
    }
    fetchData();
  }, [])

  return (
    <div className="MethodInfo">
      <InfoImage title={display.title} description={display.description} image={display.image} />
      <Categories
        list={display}
        listObject={"products"}
        objectName={"product"}
        title={"Productos"}
        defaultText={"No se encuentran productos"}
        linkItem={"/areas/marcas/metodos/productos/"}
        useTitle={false}
        cap={-1}
        horizontal={true}
      />
    </div>
  );
}
export default MethodInfo;
