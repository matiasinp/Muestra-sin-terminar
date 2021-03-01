import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { Carousel } from "react-bootstrap";
import './CarouselNews.css';
import { useWindowSize } from "./../../Template";
const CarouselNews = ({ news, width="100%", height="100vh - 130px", link="/", square=false }) => {
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState([]);

  const ref = useRef(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    let elements = [];
    let windowAspectRatio = window.innerWidth / window.innerHeight;
    try {
      windowAspectRatio = ref.current.element.offsetWidth / ref.current.element.offsetHeight;
      if (square)
        height = String(ref.current.element.offsetWidth) + "px";
    } catch (e) {

    }
    const windowHeight = window.innerHeight - 130;
    let length = news.length
    if (news.length > 5)
      length = 5
    for (let i = 0; i < length; i++) {
      let img = "";
      let point = "center";
      for (let j = 0; j < news[i].images.length; j++) {
        if (news[i].images[j].index == 0) {
          if (windowAspectRatio > 0.75) {
            if (news[i].images[j].mobile) {
              img = news[i].images[j].image;
              point = "0 " + (windowHeight * (news[i].images[j].point / news[i].images[j].height)) * -1 + "px"
              break;
            }
            img = news[i].images[j].image;
            break;
          }
          else {
            if (!news[i].images[j].mobile) {
              let desktopWidth = windowHeight * (news[i].images[j].width / news[i].images[j].height);
              img = news[i].images[j].image;
              let difference = ((windowHeight * 0.75) * (0.75 - windowAspectRatio)) / 2;
              let x = (desktopWidth * (news[i].images[j].point / news[i].images[j].width)) + difference;
              point = x * -1 + "px 0"
              break;
            }
            img = news[i].images[j].image;
            break;
          }
        }
      }
      if (img !== "") {
        elements.push(
          <Carousel.Item key={news[i].id}>
            <Link to={link + news[i].id}>
              <div className="overlay">
                <img className="d-block" src={img}
                  style={{
                    objectPosition: point,
                    width: `-webkit-calc(${width})`,
                    width: `   -moz-calc(${width})`,
                    width: `        calc(${width})`,
                    height: `-webkit-calc(${height})`,
                    height: `   -moz-calc(${height})`,
                    height: `        calc(${height})`
                  }}
                />
              </div>
              <Carousel.Caption>
                <h5>{news[i].title}</h5>
                <p>{news[i].shortDescription}</p>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        );
      }
    }
    setSlides(elements);
  }, [news, useWindowSize(), ref])


  return (
    <Carousel className="CarouselNews" activeIndex={index} onSelect={handleSelect} ref={ref}>
      {slides}
    </Carousel>
  );
}

export default CarouselNews;
