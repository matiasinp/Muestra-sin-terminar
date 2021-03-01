import React, { useEffect, useState } from "react";
import InfoImage from "./subcomponents/Content/InfoImage";
import Categories from "./subcomponents/Content/Categories";
import axios from "axios";

const AreaBrandInfo = ({areas, match}) => {
  const { params: { areaBrandId } } = match;
  const [ areaBrand, setAreaBrand ] = useState({})

  useEffect(() => {
    for (let i = 0; i < areas.length; i++) {
      for (let j = 0; j < areas[i].brands.length; j++) { //areas[i].brands => lista de areaBrands
        if (areaBrandId == areas[i].brands[j].id) {  //areas[i].brands[j] => objeto de areaBrands
          const fetchData = async () => {
            console.log(areaBrandId)
            const result1 = await axios(
              'http://localhost:8000/api/methods/?fk=' + areaBrandId,
            );
            let aux = {...areas[i].brands[j]};

            aux.methods = result1.data;

            aux.methods.sort((a, b) => {
              let Diacritics = require('diacritic');

              let keyA = Diacritics.clean(a.title);
              let keyB = Diacritics.clean(b.title);
              // Compare the 2 dates
              if (keyA < keyB) return -1;
              if (keyA > keyB) return 1;
              return 0;
            });
            console.log(aux)
            setAreaBrand(aux)
          }
          fetchData();
          break;
        }
      }
      if(Object.entries(areaBrand).length > 0) {
        break;
      }
    }
  }, [areas])

  return (
    <div className="AreaBrandInfo">
      <InfoImage title={areaBrand.title} description={areaBrand.description} image={areaBrand.image} />
      <Categories
        list={areaBrand}
        listObject={"methods"}
        listPrefix={"areaBrand"}
        title={"Métodos"}
        defaultText={"No se encuentran métodos"}
        linkItem={"/areas/marcas/metodos/"}
        useTitle={false}
        cap={-1}
      />
    </div>
  );
}

export default AreaBrandInfo;
