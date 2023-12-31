import React, { useState } from "react";
import { useNavigate } from "react-router";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";
import { registerUser } from "../../services/apicalls";
import "./Register.css";

export const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
  });

  const [userError, setUserError] = useState({
    nameError: "",
    surnameError: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
  });

  const functioHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const errorCheck = (e) => {
    let error = "";

    error = validator(e.target.name, e.target.value);

    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const Submit = () => {
    for (let test1 in user) {
      if (user[test1] === "") {
        return;
      }
    }

    for (let test in userError) {
      if (userError[test] !== "") {
        return;
      }
    }

    registerUser(user)
      .then((resultado) => {
        console.log(resultado);

        setTimeout(() => {
          navigate("/login");
        }, 500);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="registerDesign">
      <div className="Name">Name</div>
      <CustomInput
        design={`inputDesign ${
          userError.nameError !== "" ? "inputDesignError" : ""
        }`}
        type={"text"}
        name={"name"}
        placeholder={""}
        functionProp={functioHandler}
        functionBlur={errorCheck}
      />
      <div className="errorMsg">{userError.nameError}</div>
      <div className="Name">Surname</div>
      <CustomInput
        design={`inputDesign ${
          userError.surnameError !== "" ? "inputDesignError" : ""
        }`}
        type={"text"}
        name={"surname"}
        placeholder={""}
        functionProp={functioHandler}
        functionBlur={errorCheck}
      />
      <div className="errorMsg">{userError.surnameError}</div>
      <div className="Name">Username</div>
      <CustomInput
        design={`inputDesign ${
          userError.usernameError !== "" ? "inputDesignError" : ""
        }`}
        type={"text"}
        name={"username"}
        placeholder={""}
        functionProp={functioHandler}
        functionBlur={errorCheck}
      />
      <div className="errorMsg">{userError.usernameError}</div>
      <div className="Name">Email</div>
      <CustomInput
        design={`inputDesign ${
          userError.emailError !== "" ? "inputDesignError" : ""
        }`}
        type={"email"}
        name={"email"}
        placeholder={""}
        functionProp={functioHandler}
        functionBlur={errorCheck}
      />
      <div className="errorMsg">{userError.emailError}</div>
      <div className="Name">Password</div>
      <CustomInput
        design={`inputDesign ${
          userError.passwordError !== "" ? "inputDesignError" : ""
        }`}
        type={"password"}
        name={"password"}
        placeholder={""}
        functionProp={functioHandler}
        functionBlur={errorCheck}
      />
      <div className="errorMsg">{userError.passwordError}</div>

      <div className="buttonSubmit" onClick={Submit}>
        Submit
      </div>
    </div>
  );
};
