import "./Users.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { GetAllUsers } from "../../services/apicalls";
import { UsersCards } from "../../common/UsersCards/UsersCards";


export const Users = () => {
  const [users, setUsers] = useState([]);
  const rdxUser = useSelector(userData);
  const token = rdxUser.credentials.token; 
  const Admin = rdxUser.credentials?.user?.role === "admin";
  const navigate = useNavigate();
  useEffect(() => {
    if (!Admin) {
      navigate("/");
    }
  }, [Admin]);

  useEffect(() => {
    if (users.length === 0) {
      GetAllUsers(token)
        .then((result) => {
          if (result.data.data.length > 0) {
            setUsers(result.data.data);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [users]);

  return (
    <div className="AllUsersDesign">
      {users.length > 0 ? (
        <div>
          {users.map((user) => {
            return (
              <div className="allUsers">
                <UsersCards
                  key={user.id}
                  name={user.name}
                  surname={user.surname}
                  username={user.username}
                  email={user.email}
                  role={user.role}
                  is_active={user.is_active}
                />
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
