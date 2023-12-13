
import { useState } from "react";
import "./Login.css";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { useNavigate } from "react-router-dom";



export const Login = () => {

    const navigate = useNavigate();

    const [credenciales, setCredenciales] = useState({
        username: "",
        password: "",
    });

    const functionHandler = (e) => {
        setCredenciales((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const logMe = () => {

        logUser(credenciales)
        .then(
            resultado => {
                console.log(resultado)

                setTimeout(() => {
                    navigate("/");
                },500);
            }
        )
        .catch(error => console.log(error));

    }

    return (
        <div className="loginDesign">
            <CustomInput
                design={"inputDesign"}
                type={"text"}
                name={"username"}
                placeholder={""}
                functionProp={functionHandler}
            />
            <CustomInput
                design={"inputDesign"}
                type={"password"}
                name={"password"}
                placeholder={""}
                functionProp={functionHandler}
            />
            <div className="buttonSubmit" onClick={logMe}>Log Me!</div>
        </div>
    );
};