import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

import auth from '../../firebase.init';
import Loading from './Loading';


const Navbar = () => {
    const [user, loading, error] = useAuthState(auth);


    const logout = () => {
        localStorage.removeItem('accessToken');
        signOut(auth);
    };


    const menuItems = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/purchase'>Purchase</Link></li>
        <li><Link to='/blogs'>Blogs</Link></li>
        <li><Link to='/portfolio'>Portfolio</Link></li>
        {
            user && <li><Link to='/dashboard'>Dashboard</Link></li>
        }

        {user ?
            <li><button className="btn btn-ghost" onClick={logout}>Sign Out</button> </li>
            : loading ? <button className="btn btn-ghost loading"></button> : <li><Link to='/login'>Login</Link></li>}
    </>;

    return (
        <div>

            <div className="navbar bg-gray-600 text-white">
                <div className="navbar-start">
                    {/* code for small screen */}
                    <div className="dropdown">
                        <label tabIndex="0" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-gray-400 text-white rounded-box w-52">
                            {menuItems}
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">Auto Parts Mart</a>
                </div>

                {/* code for large screen */}
                <div className="navbar-right hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {menuItems}
                    </ul>
                </div>

                <div className="navbar-end">
                    {
                        user && <a className='px-5 text-yellow-500'>Active: {user.displayName}</a>
                    }
                    <label for="dashboard-sidebar" tabIndex="1" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                </div>
            </div>

        </div>
    );
};

export default Navbar;