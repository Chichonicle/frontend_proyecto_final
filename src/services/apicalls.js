
import axios from 'axios';

export const logUser = async (body) => {

    return await axios.post("http://localhost:8000/api/login", body);
}

export const registerUser = async (body) => {
    return await axios.post("http://localhost:8000/api/register", body);
}

export const getProfile = async (token) => {
    return await axios.get("http://localhost:8000/api/profile", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const updateProfile = async (token, body) => {
    return await axios.put("http://localhost:8000/api/update", body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}