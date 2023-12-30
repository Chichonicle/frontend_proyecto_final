import React from "react";
import "./UsersCards.css";

export const UsersCards = ({ id, name, email, role, username, is_active, surname }) => {
  

  return (
    <div className="AllUserCardDesign" draggable="false">
      <div> {id} </div>
      <div>Nombre: {name} </div>
      <div>Apellidos: {surname} </div>
      <div>Nick: {username} </div>
      <div>Email: {email} </div>
      <div>Role: {role} </div>
      <div>Active: {is_active ? "Yes" : "No"} </div>
    </div>
  );
};