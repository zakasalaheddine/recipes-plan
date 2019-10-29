import React from 'react';
import { Link } from 'react-router-dom';

import AppRoutes from '../utils/routes';



function Sidebar(props) {
    const handleItemClick = () => console.log(props);
    return (
        <div>
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <Link to="/" className='sidebar-brand d-flex align-items-center justify-content-center'>
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Recipes Plan</div>
            </Link>
            <hr className="sidebar-divider my-0" />
            {
                AppRoutes.map(route => (
                route.showInSideBar &&
                <li className="nav-item active" key={route.name} >
                    <Link
                    to={route.link} 
                    onClick={handleItemClick} 
                    className='nav-link'>
                        <i className={route.icon}></i>
                        <span> {route.name}</span>
                    </Link>
                </li>
                ))
            }
            </ul>
        </div>
    );
}

export default Sidebar;