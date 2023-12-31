import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";
import "./LinkButton.css";

import { useNavigate } from "react-router-dom";

export const LinkButton = ({ path, title }) => {
  const navigate = useNavigate();
  const rdxUser = useSelector(userData);
  const Admin = rdxUser.credentials?.user?.role === "admin";

  return (
    <div className={Admin ? "linkButtonDesignAdmin" : "linkButtonDesign"} onClick={() => navigate(path)}>
      {title}
    </div>
  );
};
