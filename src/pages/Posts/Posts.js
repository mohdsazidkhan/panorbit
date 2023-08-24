import React, { Fragment, useEffect, useState } from "react";
import "./posts.css";
import { useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

let API_URL = "https://panorbit.in/api/users.json";

function Posts() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
    axios
      .get(API_URL)
      .then((response) => {
        if (response.status === 200) {
          let fusers = response.data.users.filter(
            (item) => item?.id !== user?.id
          );
          setUsers(fusers.slice(0, 2));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSwitchUser = (user) => {
    navigate(`/profile/${user.id}`);
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    axios
      .get(API_URL)
      .then((response) => {
        if (response.status === 200) {
          let fusers = response.data.users.filter(
            (item) => item?.id !== user?.id
          );
          setUsers(fusers.slice(0, 2));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="mainContainer">
      <Sidebar />
      <div className="content">
        <div className="header flex justify-between items-center pb-5">
          <div className="text-[#5e5e5e] font-semibold text-lg">Posts</div>
          <Menu as="div" className="relative ml-3">
            <div className="profileMenu">
              <Menu.Button className="relative flex rounded-full focus:outline-none">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src={user?.profilepicture}
                  alt={user?.name}
                />
                <span className="pl-4 text-[#666] font-semibold text-base">
                  {user?.name}
                </span>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="customDropdown absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  <>
                    <img
                      className="menuPic"
                      src={user?.profilepicture}
                      alt={user?.name}
                    />
                    <div className="menuName">{user?.name}</div>
                    <div className="menuEmail">{user?.email}</div>
                  </>
                </Menu.Item>
                {users?.map((item) => (
                  <Menu.Item key={item.id}>
                    <div
                      className="otherUsers"
                      onClick={() => handleSwitchUser(item)}
                    >
                      <img
                        className="otherPic"
                        src={item?.profilepicture}
                        alt={item?.name}
                      />
                      <span className="otherName">{item?.name}</span>
                    </div>
                  </Menu.Item>
                ))}
                <Menu.Item>
                  <div className="signOutBtn" onClick={handleSignOut}>
                    Sign out
                  </div>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <div className="comingSoon">Coming Soon</div>
      </div>
    </div>
  );
}

export default Posts;
