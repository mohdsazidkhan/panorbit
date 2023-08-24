import React, { Fragment, useEffect, useState } from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import GoogleMapReact from 'google-map-react';
import { BsChatRight } from 'react-icons/bs';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import {IoClose} from 'react-icons/io5'
import Sidebar from '../../components/Sidebar'

let API_URL = "https://panorbit.in/api/users.json";

const AnyReactComponent = ({ text }) => <div className="text-white">{text}</div>;

function Profile() {
  
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [chatUser, setChatUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [showChatList, setShowChatList] = useState(false);
  const [showChat, setShowChat] = useState(false);

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
          setUsers(fusers);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleSwitchUser = (user) => {
    console.log(user)
    navigate(`/profile/${user.id}`);
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    axios
    .get(API_URL)
    .then((response) => {
      if (response.status === 200) {
        let fusers = response.data.users.filter(
          (item) => item?.id !== user?.id
        );
        setUsers(fusers);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const toggleChatList = () => {
    setShowChatList(!showChatList);
  }

  const handleChatUser = (user) =>{
    setChatUser(user);
    setShowChatList(true);
    setShowChat(true);
  }

  const handleChat = () => {
    setShowChat(false);
    setShowChatList(false)
  }
  
  const defaultProps = {
    center: {
      lat: user?.address?.geo?.lat ? Number(user?.address?.geo?.lat) : 28.6436846,
      lng: user?.address?.geo?.lng ? Number(user?.address?.geo?.lng) : 76.7635778
    },
    zoom: 8
  };

  return (
    <div className="mainContainer">
      
      <Sidebar />

      <div className="content">
        <div className="header flex justify-between items-center pb-5">
          <div className="text-[#5e5e5e] font-semibold text-lg">Profile</div>
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
                {users?.slice(0,2).map((item) => (
                  <Menu.Item key={item.id}>
                    <div className="otherUsers" onClick={()=>handleSwitchUser(item)}>
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

        <div className="profileContent">
          <div className="flex">
            <div className="flex-initial w-96 leftProfile mt-5">
              <div className="userDetail py-4 justify-center flex flex-col items-center">
                <img
                  src={user?.profilepicture}
                  className="bigPic"
                  alt={user?.name}
                />
                <div className="mt-3 font-semibold text-lg text-[#444]">{user?.name}</div>
                <div className="detailGrid">
                  <div className="text-[#999] text-base text-right">Username : </div>
                  <div className="text-[#444] text-base font-semibold pl-3">{user?.username}</div>
          
                  <div className="text-[#999] text-base text-right">e-mail : </div>
                  <div className="text-[#444] text-base font-semibold pl-3">{user?.email}</div>
            
                  <div className="text-[#999] text-base text-right">Phone : </div>
                  <div className="text-[#444] text-base font-semibold pl-3">{user?.phone.slice(0, 12)}</div>
          
                  <div className="text-[#999] text-base text-right">Website : </div>
                  <div className="text-[#444] text-base font-semibold pl-3">{user?.website}</div>
                </div>
                <div className="text-base font-medium text-[#999] mt-4">Company</div>
                <div className="detailGrid noBorder">
                  <div className="text-[#999] text-base text-right">name : </div>
                  <div className="text-[#444] text-base font-semibold pl-3">{user?.company?.name}</div>
          
                  <div className="text-[#999] text-base text-right">catchphrase : </div>
                  <div className="text-[#444] text-base font-semibold pl-3">{user?.company?.catchPhrase}</div>
            
                  <div className="text-[#999] text-base text-right">bs : </div>
                  <div className="text-[#444] text-base font-semibold pl-3">{user?.company?.bs}</div>
          
                </div>
              </div>
            </div>
            <div className="flex-1 mt-5 rightProfile pl-5">
            <div className="text-base font-medium text-[#999]">Address:</div>
                <div className="addressGrid">
                  <div className="text-[#999] text-base text-right">Street : </div>
                  <div className="text-[#444] text-base font-semibold pl-3">{user?.address?.street}</div>
          
                  <div className="text-[#999] text-base text-right">Suite : </div>
                  <div className="text-[#444] text-base font-semibold pl-3">{user?.address?.suite}</div>
            
                  <div className="text-[#999] text-base text-right">City : </div>
                  <div className="text-[#444] text-base font-semibold pl-3">{user?.address?.city}</div>

                  <div className="text-[#999] text-base text-right">Zipcode : </div>
                  <div className="text-[#444] text-base font-semibold pl-3">{user?.address?.zipcode}</div>
          
                </div>
                <div style={{ height: '40vh', width: '100%' }}>
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: "" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                  >
                    <AnyReactComponent
                      lat={defaultProps.center.lat}
                      lng={defaultProps.center.lng}
                      text="Marker"
                    />
                  </GoogleMapReact>
                </div>
                <div className="flex justify-end items-center mt-3">
                <div>
                  <span className="text-[#777]">Lat: </span> 
                  <span className="text-[#444] font-semibold pl-1">{user?.address.geo.lat}</span>
                </div>
                <div className="pl-5">
                  <span className="text-[#777]">Long:</span> 
                  <span className="text-[#444] font-semibold pl-1">{user?.address.geo.lng}</span>
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`chatListBox ${showChatList ? 'openChatList' : ''}`}>
        <div className="chatHeader flex justify-between items-center" onClick={toggleChatList}>
          <div className="flex justify-center items-center"><BsChatRight className="text-white"/> <span className="text-lg font-semibold text-white pl-3">Chats</span></div>
          <div>{showChatList ? <FaAngleDown className="text-white"/> : <FaAngleUp className="text-white"/>}</div>
        </div>
        <div className="chatList">
            {users.map((item)=>
              <div 
              key={item?.id} 
              className="chatUser flex justify-start items-center px-4 py-2 cursor-pointer" 
              onClick={()=>handleChatUser(item)}
              >
              <div><img src={item?.profilepicture} alt={item?.name}/></div>
              <div className="pl-3 text-[#444]">{item?.name}</div>
            </div>
            )}
        </div>
      </div>

      {showChat &&
      <div className='chatBox' onClick={handleChat}>
        <div className="chatHeader flex justify-between items-center">
          <div className="flex justify-center items-center"><img className="chatPic" src={chatUser?.profilepicture} alt={chatUser?.name}/> <span className="text-base font-semibold text-white pl-3">{chatUser?.name}</span></div>
          <div className="flex">{showChat ? <FaAngleDown className="text-white"/> : <FaAngleUp className="text-white"/>} <span><IoClose className="text-white"/></span></div>
        </div>
        <div className="chat p-4">
          <div className="text-[#444] text-sm chatMsg">Lorem Ipsum Dolar Sit Amet</div>
          <div className="text-[#444] text-sm chatMsg">Lorem Ipsum Dolar Sit Amet</div>
          <div className="text-[#444] text-sm chatMsg">Lorem Ipsum Dolar Sit Amet</div>
          <div className="text-[#444] text-sm chatMsg">Lorem Ipsum Dolar Sit Amet</div>
          <div className="text-[#444] text-sm chatMsg">Lorem Ipsum Dolar Sit Amet</div>
        </div>
      </div>
      }
    </div>
  );
}

export default Profile;
