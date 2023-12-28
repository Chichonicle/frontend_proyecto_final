import "./SerieCard.css";

export const SerieCard = ({ serie }) => {
    return (
      <div className="serie-card">
        <h2>{serie.name}</h2>
        <img src={serie.picture} alt={serie.title} />
        <p>{serie.genre}</p>
        <p>{serie.year}</p>
      </div>
    );
  };