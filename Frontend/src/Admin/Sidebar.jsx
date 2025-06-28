import React, { useState } from 'react';
import {
  FiGrid,
  FiShoppingCart,
  FiBox,
  FiTag,
  FiUsers,
  FiUser,
  FiImage,
  FiPieChart,
  FiChevronDown,
  FiChevronRight,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const SidebarItem = ({ title, icon, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="sidebar-item">
      <div className="sidebar-title" onClick={() => setOpen(!open)}>
        <div className="sidebar-icon-title">
          {icon}
          <span>{title}</span>
        </div>
        {children && (open ? <FiChevronDown /> : <FiChevronRight />)}
      </div>
      {open && <div className="sidebar-submenu">{children}</div>}
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="sidebars">
      <div className="sidebar-header">
        <div className="logo">R</div>
        <span className="logo-text">Remos</span>
      </div>

      <div className="sidebar-section-title">MAIN HOME</div>
      <SidebarItem title="Dashboard" icon={<FiGrid />} />

      <div className="sidebar-section-title">ALL PAGE</div>

      {/* Ecommerce Section */}
      <SidebarItem title="Ecommerce" icon={<FiShoppingCart />}>
        <Link to="/admin/addproduct" className="submenu-item">Add Product</Link>
        <div className="submenu-item">Product Detail 1</div>
        <div className="submenu-item">Product Detail 2</div>
        <div className="submenu-item">Product Detail 3</div>
      </SidebarItem>

      <SidebarItem title="Category" icon={<FiBox />} />
      <SidebarItem title="Attributes" icon={<FiTag />} />

      {/* Corrected Order Section */}
      <SidebarItem title="Order" icon={<FiShoppingCart />}>
        <Link to="/admin/orderlist" className="submenu-item">Order List</Link>
      </SidebarItem>

      <SidebarItem title="User" icon={<FiUser />} />
      <SidebarItem title="Roles" icon={<FiUsers />} />
      <SidebarItem title="Gallery" icon={<FiImage />} />
      <SidebarItem title="Report" icon={<FiPieChart />} />

     
    </div>
  );
};

export default Sidebar;
