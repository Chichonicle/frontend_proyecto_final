import React, { useEffect, useState } from "react";
import { Carousel } from 'react-bootstrap'; // Añade esta línea

import "./Home.css";
import { GetSeries } from "../../services/apicalls";

export const Home = () => {
  const  [series, setSeries] = useState([]);

  useEffect(() => {
    if (series.length === 0) {
      GetSeries()
      .then((series)=>{
        setSeries(series.data.data);
      })
      .catch((error) => console.log(error));
    }
  },[series]);

  return (
    <div className="homeDesign">
      {series.length > 0 ? (
        <Carousel>
          {series.map((serie) => {
            return (
              <Carousel.Item key={serie.id}>
                <img
                  className="d-block w-100"
                  src={serie.picture}
                  alt={serie.name}
                  style={{width: '30em', height: '30em', objectFit: 'contain'}} // Añade esta línea
                />
              </Carousel.Item>
            );
          })}
        </Carousel>
      ) : (
        <div> Aun no hay series</div>
      )}
    </div>
);
};