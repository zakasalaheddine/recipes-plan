import React from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';


function Layout(props) {
  return (
    <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar />
            <div className="container-fluid">
                {props.children}
            </div>
          </div>
        </div>
    </div>
  );
}

export default Layout;