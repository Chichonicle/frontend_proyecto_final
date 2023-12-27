import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

import "./Series.css";
import { GetSeries } from "../../services/apicalls";
import { userData } from "../userSlice";

export const Series = () => {
  const [series, setSeries] = useState([]);
  const [hoveredSerieId, setHoveredSerieId] = useState(null);

  const rdxUser = useSelector(userData);
  const token = rdxUser.credentials.token;

  useEffect(() => {
    if (series.length === 0) {
      GetSeries()
        .then((series) => {
          setSeries(series.data.data);
        })
        .catch((error) => console.log(error));
    }
  }, [series]);

  return (
    <div className="serieDesign">
      {series.length > 0 ? (
        <>
          {series.map((serie) => {
            return (
              <Card style={{ width: "18rem" }} key={serie.id} onMouseEnter={() => setHoveredSerieId(serie.id)} onMouseLeave={() => setHoveredSerieId(null)}>
                <div className="image-container">
                  <Card.Img variant="top" src={serie.picture} />
                  {hoveredSerieId === serie.id && (
                    <div className="overlay">
                      <Link to="/chat" className="chat-button">
                        <Button>Ir al chat</Button>
                      </Link>
                    </div>
                  )}
                </div>
                <Card.Body>
                  <Card.Title>{serie.name}</Card.Title>
                  <Card.Text>
                    Género: {serie.genre}
                    <br />
                    Año: {serie.year}
                  </Card.Text>
                  {token && (
                    <Button
                      variant="primary"
                      href={serie.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver ahora
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </>
      ) : (
        <div> Aun no hay series</div>
      )}
    </div>
  );
};