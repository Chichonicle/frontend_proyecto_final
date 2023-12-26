import React, { useEffect, useState } from "react";

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
        <>
        {series.map((series) => {
          return (
            <div className="card" key={series.id}>
              {series.name}
              <img
              className="avatarSerie"
              src={series.picture}
              alt={series.name}
              />
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
