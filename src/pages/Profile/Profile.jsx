import { useDispatch, useSelector } from "react-redux";
import "./Profile.css";
import { login, userData } from "../userSlice";
import { validator } from "../../services/useful";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getProfile, updateProfile } from "../../services/apicalls";
export const Profile = () => {
  const dispatch = useDispatch();
  const rdxUser = useSelector(userData);
  const token = rdxUser.credentials.token;
  const navigate = useNavigate();
  const [isEnabled, setIsEnabled] = useState(true);
  const [msgError, setMsgError] = useState();
  const [render, setRender] = useState(false); // Nuevo estado

  const [profile, setProfile] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    role: "",
    password: "",
  });
  const [profileError, setProfileError] = useState({
    nameError: "",
    surnameError: "",
    usernameError: "",
    emailError: "",
    roleError: "",
    passwordError: "",
  });
  useEffect(() => {
  }, [rdxUser]);
  useEffect(() => {
    setMsgError("");
    for (let test in profile) {
      if (profile[test] === "") {
        getProfile(token)
          .then((result) => {
            setProfile(result.data.data);
          })
          .catch((error) => console.log(error));
      }
    }
  }, [profile, render]); // Agregado render al array de dependencias

  const errorCheck = (e) => {
    let error = "";
    error = validator(e.target.name, e.target.value);
    setProfileError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };
  const functionHandler = (e) => {
    setProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendData = () => {
    updateProfile(profile, rdxUser)
      .then((result) => {
        // Actualiza el estado de Redux con los nuevos datos del perfil
        dispatch(login(result.data));
        setIsEnabled(true);
        setRender(!render);
      })
      .catch((error) => {
        console.log(error);
        setIsEnabled(true);
      });
  };
  return (
    <div className="profileDesign">
      <div className="Name">Nombre</div>
      <CustomInput
        disabled={isEnabled}
        design={"inputDesign"}
        type={"text"}
        name={"name"}
        placeholder={""}
        value={profile.name}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className="Name">Apellido</div>
      <CustomInput
        disabled={isEnabled}
        design={"inputDesign"}
        type={"text"}
        name={"surname"}
        placeholder={""}
        value={profile.surname}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className="Name">Nick</div>
      <CustomInput
        disabled={isEnabled}
        design={"inputDesign"}
        type={"text"}
        name={"username"}
        placeholder={""}
        value={profile.username}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className="Name">Email</div>
      <CustomInput
        disabled={isEnabled}
        design={"inputDesign"}
        type={"text"}
        name={"email"}
        placeholder={""}
        value={profile.email}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      <div className="Name">Role</div>
      <CustomInput
        disabled={true}
        design={"inputDesign"}
        type={"text"}
        name={"role"}
        placeholder={""}
        value={profile.role}
        functionProp={functionHandler}
        functionBlur={errorCheck}
      />
      {isEnabled ? (
        <div className="buttonSubmit" onClick={() => setIsEnabled(!isEnabled)}>
          EDIT
        </div>
      ) : (
        <div className="buttonSubmit" onClick={() => sendData()}>
          SAVE
        </div>
      )}
    </div>
  );
};