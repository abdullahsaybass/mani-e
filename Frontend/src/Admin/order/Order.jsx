import React, { useState } from 'react';
import {
  FiSearch,
  FiFileText,
  FiEye,
  FiEdit2,
} from 'react-icons/fi';
import './Order.css';

const SAMPLE_DATA = [
  {
    id: '7712309',
    name: 'Kristin Watson',
    img: '/images/prod1.png',
    price: '$1,452.500',
    qty: '1,638',
    payment: '20',
    status: 'Success',
  },
  {
    id: '7712310',
    name: 'Leslie Alexander',
    img: '/images/prod2.png',
    price: '$2,100.00',
    qty: '800',
    payment: '15',
    status: 'Pending',
  },
  {
    id: '7712311',
    name: 'Cody Fisher',
    img: '/images/prod3.png',
    price: '$789.00',
    qty: '450',
    payment: '30',
    status: 'Cancel',
  },
  // …add more as needed
];

export default function OrderList() {
  const [filter, setFilter] = useState('');

  const filtered = SAMPLE_DATA.filter(o =>
    o.name.toLowerCase().includes(filter.toLowerCase()) ||
    o.id.includes(filter)
  );

  return (
    <div className="order-list-page">
      <h1 className="page-title">Order List</h1>

      <div className="order-list-header">
        <div className="search-wrapper">
          <FiSearch className="search-icon"/>
          <input
            type="text"
            placeholder="Search here..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
        </div>
        <button className="btn export-btn">
          <FiFileText className="btn-icon"/> Export all order
        </button>
      </div>

      <table className="order-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Order ID</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Tracking</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((o, idx) => (
            <tr key={o.id + idx}>
              <td className="prod-cell">
                <img src={o.img} alt="" />
                <span>{o.name}</span>
              </td>
              <td>#{o.id}</td>
              <td>{o.price}</td>
              <td>{o.qty}</td>
              <td>{o.payment}</td>
              <td>
                <span className={`status-pill ${o.status.toLowerCase()}`}>
                  {o.status}
                </span>
              </td>
              <td>
                <button className="btn tracking-btn">Tracking</button>
              </td>
              <td className="action-cell">
                <FiEye className="action-icon"/>
                <FiEdit2 className="action-icon"/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
