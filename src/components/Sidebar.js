import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  },[])
  return (
    <aside className="sidebar">
        <ul>
          <li>
            <NavLink to={`/profile/${user?.id}`} activeclassname="active">
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to={`/posts/${user?.id}`}>Posts</NavLink>
          </li>
          <li>
            <NavLink to={`/gallery/${user?.id}`}>Gallery</NavLink>
          </li>
          <li>
            <NavLink to={`/todo/${user?.id}`}>ToDo</NavLink>
          </li>
        </ul>
      </aside>
  )
}

export default Sidebar