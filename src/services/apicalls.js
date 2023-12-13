
import axios from 'axios';

export const logUser = async (body) => {

    return await axios.post("http://localhost:8000/api/login", body);
}