import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { Register } from '../Register/Register';
import { Profile } from "../Profile/Profile";
import { Series } from "../Series/Series";
import { Users } from "../Users/Users";
import { Chat } from "../Chat/Chat";
import {CreateSerie} from "../CreateSerie/CreateSerie";








export const Body = () => {


    return (
        <>
        <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/series" element={<Series />} />
            <Route path="/users" element={<Users />} />
            <Route path="/chat/:salasId" element={<Chat />} />
            <Route path="/CreateSerie" element={<CreateSerie />} />


        </Routes>
        </>
    )
}