import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Row, Col, Card } from "react-bootstrap";
import { Scrollbars } from 'react-custom-scrollbars';
import { FiExternalLink } from "react-icons/fi";
import { useWindowSize } from "./../../Template";
import { v4 as uuidv4 } from 'uuid';
import './CategoriesItems.css';

const CategoriesItems = ({
  object,
  linkItem,
  quantity,
  horizontal,
  width
}) => {

  const [ cards, setCards ] = useState();

  useEffect(() => {
    let padding = "100%";
    if (horizontal && width/4 < 150)
      padding = "0";

    let flag = false;
    if (window.matchMedia('(max-width: 991px)').matches && window.innerHeight > window.innerWidth)
      flag = true;

    setCards(
      <Col xs={12/quantity} className="CategoriesItems">
        <Link to={linkItem + object.id}>
          <Card
            style={
              horizontal
              ?
              { height: "auto" }
              :
              {
                height: width * 1.7,
              }
            }
            key={object.id}
          >
            {
              horizontal
              ?
              <Row noGutters={true} style={{height: "100%"}}>
                <Col xs={4} lg={3}>
                  <Card.Img variant="top" style={{background: "url(" + object.image + ")", paddingBottom: padding }} />
                </Col>
                <div className='linkIcon'>
                  <FiExternalLink />
                </div>
                <Col xs={8} lg={9} >
                  <Card.Body>
                    {
                      width >= 400
                      ?
                        <>
                          <Card.Title
                            style={flag
                              ?
                                { paddingRight: "30px", whiteSpace: "normal" }
                              :
                                { paddingRight: "30px"} }
                          >
                            {object.title}
                          </Card.Title>
                          <Scrollbars
                            style={{
                              width: "100%",
                              height: "-webkit-calc(100% - 41px)",
                              height: "   -moz-calc(100% - 41px)",
                              height: "        calc(100% - 41px)",
                            }}
                            autoHide autoHideTimeout={500}
                            autoHideDuration={200}
                          >
                            <Card.Text className="text-justify">{object.description}</Card.Text>
                          </Scrollbars>
                        </>
                      :
                        <Scrollbars
                          style={{
                            width: "100%",
                            height: "100%"
                          }}
                          autoHide autoHideTimeout={500}
                          autoHideDuration={200}
                        >
                          <Card.Title
                            style={flag
                              ?
                                { paddingRight: "30px", whiteSpace: "normal", fontSize: "1.1em" }
                              :
                                { paddingRight: "30px", fontSize: "1.1em"} }
                          >
                            {object.title}
                          </Card.Title>
                          <Card.Text style={{ fontSize: "0.9em" }} className="text-justify">{object.description}</Card.Text>
                        </Scrollbars>
                    }
                  </Card.Body>
                </Col>
              </Row>
              :
              <>
                <Card.Img variant="top" style={{ background: "url(" + object.image + ")", paddingBottom: padding }} />
                <div className='linkIcon'>
                  <FiExternalLink />
                </div>
                <Card.Body>
                  <Card.Title>{object.title}</Card.Title>
                  <Scrollbars
                    style={{
                      width: "100%",
                      height: "-webkit-calc(100% - 41px)",
                      height: "   -moz-calc(100% - 41px)",
                      height: "        calc(100% - 41px)",
                    }}
                    autoHide autoHideTimeout={500}
                    autoHideDuration={200}
                  >
                    <Card.Text className="text-justify">{object.description}</Card.Text>
                  </Scrollbars>
                </Card.Body>
              </>
            }
          </Card>
        </Link>
      </Col>
    );
  }, [object]);

  return (
    <>
      { cards }
    </>
  )
}

export default CategoriesItems;
