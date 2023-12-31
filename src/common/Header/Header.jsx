import React, { useEffect, useState } from "react";
import "./Header.css";
import { LinkButton } from "../LinkButton/LinkButton";
import { useSelector, useDispatch } from "react-redux";
import { logout, userData } from "../../pages/userSlice";
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rdxUser = useSelector(userData);
  const Admin = rdxUser.credentials?.user?.role === "admin";

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  
  const logOutMe = () => {
    dispatch(logout({credentials : ""}))
    navigate("/")
  }



  return (
    <div className={Admin ? "headerDesignAdmin" : "headerDesign"}>
      {Admin &&(
        <div className="Role">
          <h2>Admin</h2>
        </div>
      )}
      {Admin && (
        <div>
        <LinkButton path={"/Users"} title={"Users"} />
        </div>
      )}
      {Admin && (
        <div>
        <LinkButton path={"/CreateSerie"} title={"Create Serie"} />
        </div>
      )}
      <LinkButton path={"/"} title={"Home"} />
      <LinkButton path={"/series"} title={"Series"} />
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