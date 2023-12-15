import { useDispatch, useSelector } from "react-redux";
import "./Profile.css";
import { login, userData } from "../userSlice";
import { validator } from "../../services/useful";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { updateProfile } from "../../services/apicalls";

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rdxUser = useSelector(userData);

  const [profile, setProfile] = useState({
    name: rdxUser.credentials.user.name,
    surname: rdxUser.credentials.user.surname,
    username: rdxUser.credentials.user.username,
    email: rdxUser.credentials.user.email,
    role: rdxUser.credentials.user.role,
    password: rdxUser.credentials.user.password,
  })

  const token = rdxUser.credentials.token;

  const [profileError, setProfileError] = useState({
    nameError: "",
    surnameError: "",
    usernameError: "",
    emailError: "",
    roleError: "",
    passwordError: "",
  });

  const [isEnabled, setIsEnabled] = useState(true);
  

  useEffect(() => {
    if (!rdxUser.credentials) {
      navigate("/");
    } else {
      // Cargar datos del perfil al montar el componente
      setProfile({
        name: rdxUser.credentials.user.name,
        surname: rdxUser.credentials.user.surname,
        username: rdxUser.credentials.user.username,
        email: rdxUser.credentials.user.email,
        role: rdxUser.credentials.user.role,
        password: rdxUser.credentials.user.password,
      });
    }
  }, [rdxUser.credentials]);

  useEffect(() => {
    console.log ("Perfil actualizado:", profile);
  }, [profile]);

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
    .then(result => {
      dispatch(login(profile));
      setIsEnabled(true);
    })
    .catch(error => {
      console.log(error);
      setIsEnabled(true);
    });
  }

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
      {isEnabled
      ? (<div className="buttonSubmit" onClick={()=> setIsEnabled(!isEnabled)}>EDIT</div>)
      : (<div className="buttonSubmit" onClick={()=> sendData()}>SAVE</div>)}
    </div>
  );
};
