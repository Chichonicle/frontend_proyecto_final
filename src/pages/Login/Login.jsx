import { useState } from "react";
import "./Login.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { useNavigate } from "react-router-dom";
import { logUser } from "../../services/apicalls";
import { useDispatch } from "react-redux";  
import { login } from "../userSlice";


export const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [credenciales, setCredenciales] = useState({
        username: "",
        password: "",
    });

    const [msgError, setMsgError] = useState("");

    const functionHandler = (e) => {
        setCredenciales((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const errorCheck = () => {
        console.log("Falta la palabra mágica");
    }

    const logMe = () => {

        logUser(credenciales)
        .then(
            resultado => {
                console.log(resultado)
                dispatch(login({credentials: resultado.data}))

                setTimeout(() => {
                    navigate("/");
                },500);
            }
        )
        .catch(error => {
            console.log(error);
            setMsgError("Usuario o contraseña incorrectos");
        });

    }

    return (
        <div className="loginDesign">
            <div className="Name">Username</div>
            <CustomInput
                disabled={false}
                design={"inputDesign"}
                type={"text"}
                name={"username"}
                placeholder={""}
                value={""}
                functionProp={functionHandler}
                functionBlur={errorCheck}
            />
            <div className="Name">Password</div>
            <CustomInput
                disabled={false}
                design={"inputDesign"}
                type={"password"}
                name={"password"}
                value={""}
                placeholder={""}
                functionProp={functionHandler}
                functionBlur={errorCheck}
            />
            {msgError && <div className="error-message">{msgError}</div>}
            <div className="buttonSubmit" onClick={logMe}>Log Me!</div>
        </div>
    );
};