import { SerieCard } from "./SerieCard";
import { Chat } from "./Chat";
import "./Sala.css";

export const SeriePage = ({ serie, username }) => {
  return (
    <div className="serie-page">
      <SerieCard serie={serie} />
      <Chat username={username} />
    </div>
  );
};