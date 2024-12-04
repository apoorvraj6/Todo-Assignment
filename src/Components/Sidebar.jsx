import React from 'react';
import user_image from '../assets/user_image.jpg';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation(); 
  const isActive = (path) => location.pathname === path; // 

  return (
    <div className="w-64 min-h-screen bg-red-400 text-white  flex-col items-center py-6 md:block hidden">
     
      <div className="mb-8 text-center">
        <img
          src={user_image}
          alt="Profile"
          className="w-20 h-20 rounded-full mx-auto"
        />
        <h2 className="mt-4 font-semibold text-lg">Guest</h2>
      </div>

     
      <nav className="w-full">
        <ul className="flex flex-col gap-4">
          <Link to="/">
            <li
              className={`flex items-center gap-3 px-6 py-3 rounded-md ${
                isActive('/') ? 'bg-white text-red-400' : 'hover:bg-red-500'
              }`}
            >
              Dashboard
            </li>
          </Link>
          
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
