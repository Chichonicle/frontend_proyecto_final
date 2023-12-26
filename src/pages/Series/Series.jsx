import React, { useEffect, useState } from "react";

import "./Series.css";
import { GetSeries } from "../../services/apicalls";

export const Series = () => {
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
    <div className="serieDesign">
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
