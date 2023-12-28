
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

  export const GetMessages = async (token) => {
    const response = await axios.get('http://localhost:8000/api/message', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  };

  export const CreateMessage = async (token, salasId, seriesId, message) => {
    if (!message) {
      throw new Error('The message field is required.');
    }
    return await axios.post(`http://localhost:8000/api/createMessage`, { salas_id: salasId.toString(), series_id: seriesId.toString(), message: message }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  export const DeleteMessage = async (token, id) => {
    return await axios.delete(`http://localhost:8000/api/deleteMessage/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  export const joinToSerie = async (serieId, token) => {
    return await axios.post(`http://localhost:8000/api/joinSala`, { series_id: serieId } , {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  export const GetAllUsers = async (token) => {
    return await axios.get(`http://localhost:8000/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  export const isUserMemberofSala = async (token, serieId, salaId) => {
    return await axios.get(`http://localhost:8000/api/sala/member/${salaId}/${serieId}`, {
      params: {
        series_id: serieId,
        salas_id: salaId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
