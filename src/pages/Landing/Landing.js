import React, { useEffect, useState } from "react";
import "./landing.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
let API_URL = "https://panorbit.in/api/users.json";
function Landing() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        if (response.status === 200) {
          setUsers(response.data.users);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    navigate(`/profile/${user.id}`);
  };

  return (
    <>
      <div className="mainBg">
        <div className="flex justify-center items-center h-full mx-auto p-5">
          <div className="customCard shadow-md">
            <h3 className="text-center font-semibold text-lg p-5">
              Select an account
            </h3>
            <div className="innerCard">
              <ul className="divide-y divide-gray-100">
                {users.map((user) => (
                  <li
                    key={user.id}
                    className="flex justify-start gap-x-6 py-3 px-5 items-center cursor-pointer"
                    onClick={() => handleUser(user)}
                  >
                    <img
                      className="h-12 w-12 rounded-full bg-gray-50"
                      src={user.profilepicture}
                      alt={user.name}
                    />
                    <p className="text-base font-semibold leading-6 text-[#666]">
                      {user.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
