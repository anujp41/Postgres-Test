import React from 'react';
import './ChooseOptions.css';

const ChooseOptions = ({data, cb, selected, type}) => {
  return (
    <div className='container'>
      {data.map((item, idx) => <button className={`option ${selected.includes(item.name) ? 'clicked' : ''}`} name={type} onClick={cb} key={idx} value={item.name}>{item.name}</button>)}
    </div>
  )
}

export default ChooseOptions;