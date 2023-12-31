import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./CreateSerie.css";
import { NewSerie } from "../../services/apicalls";
import { userData } from "../userSlice";
import { useSelector } from "react-redux";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { useNavigate } from "react-router";

export const CreateSerie = () => {
  const rdxUser = useSelector(userData);
  const token = rdxUser.credentials.token;
  const navigate = useNavigate();

  const [serie, setSerie] = useState({
    name: "",
    genre: "",
    year: "",
    url: "",
    picture: "",
  });

  const functioHandler = (e) => {
    setSerie((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const Submit = () => {
    NewSerie(serie, token)
      .then((resultado) => {
        console.log(resultado);

        setTimeout(() => {
          navigate("/series");
        }, 500);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="CreateSerieDesign">
      <div className="CreateSerieForm">
        <div className="Name">Name</div>
        <CustomInput
          design="inputDesign"
          type={"text"}
          name={"name"}
          placeholder={""}
          functionProp={functioHandler}
        />
        <div className="Name">Genre</div>
        <CustomInput
          design="inputDesign"
          type={"text"}
          name={"genre"}
          placeholder={""}
          functionProp={functioHandler}
        />
        <div className="Name">Year</div>
        <CustomInput
          design="inputDesign"
          type={"text"}
          name={"year"}
          placeholder={""}
          functionProp={functioHandler}
        />
        <div className="Name">Url</div>
        <CustomInput
          design="inputDesign"
          type={"text"}
          name={"url"}
          placeholder={""}
          functionProp={functioHandler}
        />
        <div className="Name">Picture</div>
        <CustomInput
          design="inputDesign"
          type={"text"}
          name={"picture"}
          placeholder={""}
          functionProp={functioHandler}
        />
        <div className="buttonSubmit" onClick={Submit}>
          Create Serie
        </div>
      </div>
    </div>
  );
};