import React, {useState, useEffect, useRef} from 'react';
import { Row, Col } from 'react-bootstrap';
import { useWindowSize } from './Template';
import useResizeAware from 'react-resize-aware';
import Squares from "./subcomponents/Content/Squares";
import Categories from "./subcomponents/Content/Categories";

const New = ({news, match}) => {
  const { params: { newId } } = match;
  const [object, setObject] = useState({images: []});
  const [after, setAfter] = useState([]);
  const [image, setImage] = useState("");
  const [height, setHeight] = useState(0);
  const [resizeListener, sizes] = useResizeAware()
  const widthRef = useRef(null);
  const heightRef = useRef(null);

  useEffect(() => {
    for (let i = 0; i < news.length; i++) {
      if (news[i].id == newId) {
        setObject(news[i]);
        setImage(news[i].images[0].image)
        let clone = JSON.parse(JSON.stringify(news));
        let aux = [];
        if (clone.length > i + 1)
          for (let j = i + 1; j < clone.length; j++) {
            clone[j].image = clone[j].images[0].image;
            clone[j].description = clone[j].shortDescription;
            aux.push(clone[j])
          }
        if (i - 1 > 0)
          for (let j = 0; j < i; j++) {
            clone[j].image = clone[j].images[0].image;
            clone[j].description = clone[j].shortDescription;
            aux.push(clone[j])
          }
        setAfter(aux);
      }
    }
  }, [news, newId]);

  useEffect(() => {
    setTimeout(() => {
      if (typeof heightRef.current != "undefined") {
        if (window.matchMedia('(min-width: 992px)').matches || (window.matchMedia('(max-width: 991px)').matches && window.innerWidth > window.innerHeight))
          setHeight(heightRef.current.offsetHeight + 20);
        else
          setHeight(1);
      }
    }, 100)
  }, [heightRef.current, useWindowSize(), sizes]);

  return (
    <div className="New" ref={widthRef}>
      <img style={{
        height: "calc(100vh - 210px)",
        width: "100%",
        backgroundImage: "url(" + image + ")",
        backgroundSize: "cover",
        backgroundPosition: "center center"
      }} />
      <Row style={{position: "relative"}}>
        {resizeListener}
        {
          object.images.length > 1
          ?
          <>
            <Col xs={window.matchMedia('(max-width: 991px)').matches && window.innerWidth > window.innerHeight?6:12} lg={8} xl={9}>
              <div ref={heightRef}>
                <h2 style={{marginTop: "10px", borderBottom: "1px solid #dbdbdb", paddingBottom: "5px"}}>{object.title}</h2>
                <p className="text-justify">{object.description}</p>
              </div>
            </Col>
            <Col xs={window.matchMedia('(max-width: 991px)').matches && window.innerWidth > window.innerHeight?6:12} lg={4} xl={3}>
              <Squares images={object.images} showFirst={false} parentHeight={height} />
            </Col>
          </>
          :
          <Col xs={12} ref={heightRef}>
            <h2 style={{marginTop: "10px", borderBottom: "1px solid #dbdbdb", paddingBottom: "5px"}}>{object.title}</h2>
            <p className="text-justify">{object.description}</p>
          </Col>
        }

      </Row>
      <Categories
        list={{after}}
        listObject={"after"}
        defaultText={"No se encuentran más noticias"}
        linkItem={"/Noticias/"}
        useTitle={false}
        cap={sizes.width > 1250 ? 2 : 4}
        forceHorizontal={true}
      />

    </div>
  );
}

export default New;
