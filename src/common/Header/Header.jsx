import React from "react";

import "./Header.css";
import { LinkButton } from "../LinkButton/LinkButton";

export const Header = () => {
  return (
    <div className="headerDesign">
      <LinkButton patch={"/"} tittle={"Home"} />
      <LinkButton patch={"/login"} tittle={"Login"} />
    </div>
  );
};
