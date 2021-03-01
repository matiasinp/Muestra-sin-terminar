import React, { useEffect, useState, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import CarouselNews from "./subcomponents/Carousel/CarouselNews";
import Categories from "./subcomponents/Content/Categories";
import Dashboard from "./subcomponents/Content/Dashboard";
import InfiniteScroll from "react-infinite-scroller";

const News = ({news}) => {
  const [list, setList] = useState([]);
  const [items, setItems] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [counter, setCounter] = useState(5);
  const ref = useRef(null);

  useEffect(() => {

    let aux = JSON.parse(JSON.stringify(news));

    aux = aux.filter(object => {
      if (object.images.length > 0) {
        object.image = object.images[0].image;
        object.description = object.shortDescription
        return true;
      }
      return false;
    });
    setList(aux);
  }, [news]);

  const loadMore = () => {
    setTimeout(() => {
      if (list.length > 0) {
        if (counter + 2 < list.length) {
          let _list = list.slice(counter, counter + 2)
          let _items = [...items];
          _items.push(
            <div style={{marginTop: "-20px"}}>
              <Categories
                list={{_list}}
                listObject={"_list"}
                defaultText={"No se encuentran más noticias"}
                linkItem={"/Noticias/"}
                useTitle={false}
                cap={-1}
                forceHorizontal={true}
              />
            </div>
          )
          setCounter(counter+2)
          setItems(_items)
        }

        else
          setHasMoreItems(false);
        console.log(counter)
      }
    }, 200);
  }

  return (
    <div>
      <h2 className="d-block d-lg-none" style={{ borderBottom: "solid 1px #dbdbdb", paddingBottom: "5px", marginBottom: "20px" }}>Noticias</h2>
      <div className={"d-none d-lg-block"}><Dashboard list={list} link={"/noticias/"}/></div>
      <div className={"d-block d-lg-none"} style={{ marginBottom: "40px"}}><CarouselNews news={list} link={"/noticias/"} height={"100vh - 194px"} /></div>
        <InfiniteScroll
          loadMore={loadMore}
          hasMore={hasMoreItems}
          useWindow={true}
        >
          {items}
        </InfiniteScroll>
    </div>
  );
};

export default News;
