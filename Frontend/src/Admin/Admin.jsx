import React from 'react';
import Sidebar from './Sidebar';

import { Outlet } from 'react-router-dom';
import './Admin.css';

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <Sidebar />
      <div className="admin-main-content">
       
        <Outlet /> {/* This changes on route */}
      </div>
    </div>
  );
};

export default AdminPanel;
