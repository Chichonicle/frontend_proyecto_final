
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

export const updateProfile = async (profile, datosRdxUser) => {
    try {
      const tokenHeader = {
        headers: {
          'Authorization': `Bearer ${datosRdxUser.credentials.token}`
        }
      };
  
      return await axios.put('http://localhost:8000/api/update', profile, tokenHeader);
    } catch (error) {
      console.log(error);
    }
  };

  export const GetSeries = async () => {
    return await axios.get(`http://localhost:8000/api/series`);
  };
