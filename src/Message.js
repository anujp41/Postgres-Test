import React from 'react';
import './Message.css';

const Message = ({message}) => (
  <div className='msgContainer'>
    <h4 className='msg'>{message}</h4>
  </div>
)

export default Message;