import React from 'react';
import './Dropdown.css';

const Dropdown = ({data}) => (
  <select>
    {data.map((item, idx) => <option key={idx} value={item}>item</option>)}
  </select>
)

export default Dropdown;