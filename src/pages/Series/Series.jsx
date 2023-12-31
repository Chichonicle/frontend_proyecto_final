import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Button, Modal } from "react-bootstrap";

import "./Series.css";
import { GetSeries, createSalaUser } from "../../services/apicalls";
import { userData } from "../userSlice";

export const Series = () => {
  const [series, setSeries] = useState([]);
  const [hoveredSerieId, setHoveredSerieId] = useState(null);
  const [isVideoShown, setIsVideoShown] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState(null);

  const rdxUser = useSelector(userData);
  const token = rdxUser.credentials.token;
  const navigate = useNavigate();

  useEffect(() => {
    GetSeries()
      .then((series) => {
        setSeries(series.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleJoinChat = async (serieId) => {
    const userId = rdxUser.credentials.user.id;
    try {
      await createSalaUser(token, serieId, userId);
    } catch (error) {
      console.error(error);
    }
    navigate(`/chat/${serieId}`);
  };

  const handleClose = () => setIsVideoShown(false);

  return (
    <div className="serieDesign">
      {series.length > 0 ? (
        <>
          {series.map((serie) => {
            return (
              <Card
                style={{ width: "18rem" }}
                key={serie.id}
                onMouseEnter={() => setHoveredSerieId(serie.id)}
                onMouseLeave={() => setHoveredSerieId(null)}
              >
                <div className="image-container">
                  <Card.Img variant="top" src={serie.picture} />
                  {hoveredSerieId === serie.id && (
                    <div className="overlay">
                      <Button onClick={() => handleJoinChat(serie.id)}>
                        Ir al chat
                      </Button>
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
                      onClick={() => {
                        setIsVideoShown(true);
                        setCurrentVideoUrl(serie.url);
                      }}
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

      <Modal show={isVideoShown} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            src={currentVideoUrl}
            title="Video"
            width="100%"
            height="400px"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
