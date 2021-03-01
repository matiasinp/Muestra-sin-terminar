import React from "react";
import Sidebar from "./subcomponents/Sidebar/Sidebar";
import CarouselNews from "./subcomponents/Carousel/CarouselNews";
import InfoImage from "./subcomponents/Content/InfoImage";
import Categories from "./subcomponents/Content/Categories";

const Home = (props) => {
  const { areas, news, active } = props;

  return (
    <div className="Home">
      <CarouselNews news={news} link={"/noticias/"}/>
      <InfoImage
        title={"Respuestas Confiables"}
        description={`Tenemos una trayectoria de más de treinta años (fundada
          en abril de 1982) en plaza proveyendo reactivos, kits de diagnóstico,
          anticuerpos, productos químicos puros para análisis, colorantes,
          equipos para laboratorio, material para el mismo, productos para
          anatomía patológica y citometría de flujo, técnicas exclusivas para
          medio ambiente y seguridad en alimentos, etc, con solvencia y responsabilidad.`}
        image={"imgs/adn.gif"}
      />
      <div style={{position: "relative"}}>
        <Categories list={areas} listObject={"brands"} objectPrefix={"area"} title={"Áreas"} linkButton={"/areas/"} linkItem={"/areas/marcas/"} active={active} />
      </div>
    </div>
  );
}

export default Home;
