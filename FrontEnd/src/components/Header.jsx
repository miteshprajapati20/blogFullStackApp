// Header.js
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import {toast} from 'react-hot-toast';

import { AppContext } from '../context/AppContext';

const Header = () => {
  const { isLoggedIn, logout } = useContext(AppContext);

  return (
    <div className='flex flex-wrap w-full fixed top-0 items-start justify-evenly border shadow-xl p-2  bg-white'>
      <nav className='font-extrabold text-2xl hover:text-stone-700 '>
        <NavLink to="/">My Blog</NavLink>
      </nav>

      <div className='flex flex-wrap gap-4 mt-1'>
        {!isLoggedIn && (
          <NavLink
            to="/login"
            className='font-bold  border-[1px] rounded-md p-[0.3rem]  hover:text-white  hover:bg-blue-600 border-gray-800 text-[1rem]'>
            Login
          </NavLink>
        )}

        {!isLoggedIn && (
          <NavLink
            to="/signup"
            className='font-bold border-[1px] rounded-md p-[0.3rem] hover:text-white border-gray-800 hover:bg-blue-600   text-[1rem]'>
            Register
          </NavLink>
        )}

        {isLoggedIn && (
          <NavLink
            to="/createpost"
            className='font-bold border-[1px] rounded-md p-[0.3rem] hover:text-white border-gray-800 hover:bg-blue-600   text-[1rem]'>
            Create Post
          </NavLink>
        )}

        {isLoggedIn && (
          <button
            onClick={() => {
              logout();
              toast.success("Logged Out");
            }}
            className='font-bold border-[1px] rounded-md p-[0.3rem] hover:text-white border-gray-800 hover:bg-blue-600   text-[1rem]'>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;


