import "./Users.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { GetAllUsers, deleteUserById } from "../../services/apicalls";
import { UsersCards } from "../../common/UsersCards/UsersCards";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const rdxUser = useSelector(userData);
  const token = rdxUser.credentials.token;
  const Admin = rdxUser.credentials?.user?.role === "admin";
  const navigate = useNavigate();

  const loadUsers = () => {
    GetAllUsers(token)
      .then((result) => {
        if (result.data.data.length > 0) {
          setUsers(result.data.data);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (userId) => {
    deleteUserById(token, userId)
      .then(() => {
        loadUsers();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (!Admin) {
      navigate("/");
    }
  }, [Admin]);

  useEffect(() => {
    if (users.length === 0) {
      loadUsers();
    }
  }, [users]);

  return (
    <div className="AllUsersDesign">
      {users.length > 0 ? (
        <div className="usersDesign">
          {users.map((user) => {
            return (
              <div className="allUsers" key={user.id}>
                <UsersCards
                  name={user.name}
                  surname={user.surname}
                  username={user.username}
                  email={user.email}
                  role={user.role}
                  is_active={user.is_active}
                />
                <button
                  onClick={() => handleDelete(user.id)}
                  className="deleteButton"
                >
                  Borrar
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div>Aun no los tenemos</div>
      )}
    </div>
  );
};
