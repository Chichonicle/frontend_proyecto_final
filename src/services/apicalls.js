
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

  export const GetMessages = async (token, salasId) => {
    const response = await axios.get(`http://localhost:8000/api/message?salas_id=${salasId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  };

  export const CreateMessage = async (token, salasId, message) => {
    if (!message) {
      throw new Error('The message field is required.');
    }
    return await axios.post(`http://localhost:8000/api/createMessage`, { salas_id: salasId.toString(), message: message }, {
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

  export const UpdateMessage = async (token, id, message) => {
    return await axios.put(`http://localhost:8000/api/updateMessage/${id}`, { message: message }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  export const DeleteMessageByAdmin = async (token, id) => {
    return await axios.delete(`http://localhost:8000/api/adminMessage/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  export const createSalaUser = async (token, salasId, userId) => {
    return await axios.post(`http://localhost:8000/api/sala-user`, { salas_id: salasId, user_id: userId } , {
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

  export const deleteUserById = async (token, userId) => {
    return await axios.delete(`http://localhost:8000/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }


  export const CreateSerie = async (token, serie) => {
    return await axios.post(`http://localhost:8000/api/serie`, serie, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }


