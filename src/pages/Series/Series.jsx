import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'; // Añade esta línea

import "./Series.css";
import { GetSeries } from "../../services/apicalls";
import { userData } from "../userSlice";

export const Series = () => {
  const  [series, setSeries] = useState([]);

  const rdxUser = useSelector(userData); // Añade esta línea
  const token = rdxUser.credentials.token; // Añade esta línea

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
    <div className="serieDesign">
      {series.length > 0 ? (
        <>
        {series.map((serie) => {
          return (
            <div className="card-container" key={serie.id}> 
              <div className="card">
                <div className="card-content">
                  <div className="name">{serie.name}</div>
                  <img
                    className="avatarSerie"
                    src={serie.picture}
                    alt={serie.name}
                  />
                  <div className="extra-info">
                    <p>Género: {serie.genre}</p>
                    <p>Año: {serie.year}</p>
                    {token && <a href={serie.url} target="_blank" rel="noopener noreferrer">Ver ahora</a>} {/* Modifica esta línea */}
                  </div>
                </div>
              </div>
            </div> 
          );
        })}
        </>
      ) : (
        <div> Aun no hay series</div>
      )}
    </div>
);
};