import React from 'react';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';


function Navbar(){
    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          <ul className="navbar-nav ml-auto">
            <div className="topbar-divider d-none d-sm-block"></div>
            <NavDropdown title="ZAKA SALAH EDDINE" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/">
                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                    Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/">
                    <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                    Settings
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/">
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    Logout
                </NavDropdown.Item>
            </NavDropdown>
          </ul>
        </nav>
    );
}
export default Navbar;