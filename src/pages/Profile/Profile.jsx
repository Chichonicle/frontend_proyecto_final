import { useSelector } from "react-redux";
import "./Profile.css";
import { userData } from "../userSlice";
import { validator } from "../../services/useful";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { useState } from "react";

export const Profile = () => {
  const rdxUser = useSelector(userData);

  const [profile, setProfile] = useState({
    name: rdxUser.credentials.user.name,
    surname: rdxUser.credentials.user.surname,
    username: rdxUser.credentials.user.username,
    email: rdxUser.credentials.user.email,
    role: rdxUser.credentials.user.role,
  });

  const errorCheck = (e) => {
    let error = "";

    error = validator(e.target.name, e.target.value);
  };

  const functionHandler = (e) => {
    setProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="profileDesign">
      <div className="Name">Nombre</div>
      <CustomInput
        disabled={true}
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
        disabled={true}
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
        disabled={true}
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
        disabled={true}
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
    </div>
  );
};
