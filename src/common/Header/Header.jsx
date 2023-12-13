import React from "react";

import "./Header.css";
import { LinkButton } from "../LinkButton/LinkButton";

import { useSelector, useDispatch } from "react-redux";
import { logout, userData } from "../../pages/userSlice";
import { useNavigate } from 'react-router-dom';


export const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rdxUser = useSelector(userData);

  const logOutMe = () => {

    dispatch(logout({credentials : ""}))

    navigate("/")
  }
 


  return (
    <div className="headerDesign">
      <LinkButton path={"/"} title={"Home"} />

      {!rdxUser?.credentials.user ? (
        <>
      <LinkButton path={"/login"} title={"Login"} />
      <LinkButton path={"/register"} title={"Register"} />
      </>
      ) : (
        <>
        <LinkButton path={"/profile"} title={rdxUser.credentials.user.username} />
        <div onClick={logOutMe}>
          <LinkButton path={"/"} title={"Logout"} />
    </div>
    </>
      )}
      </div>
  );
};
