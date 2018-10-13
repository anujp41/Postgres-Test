import React from 'react';
import './Message.css';

const Message = ({message, show}) => (
  <div className={`msgContainer ${show ? 'show' : 'hide'}`}>
    <h4 className='msg'>{message}</h4>
  </div>
)

export default Message;