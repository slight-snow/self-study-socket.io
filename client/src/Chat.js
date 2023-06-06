import React, { useEffect, useState } from 'react';
import './Chat.css';

function Chat({ socket, name, room }) {
  const [message, setMessage] = useState();
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    let messageData;
    if (message !== '') {
      messageData = {
        room: room,
        author: name,
        message: message,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      }
    }

    await socket.emit('send_message', messageData);
    setMessageList((list) => [...list, messageData])
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data])
    })
  }, [socket])

  return (
    <div className='chat-container'>
      <div className='chat-header'>
        <div className='chat-header-red' />
        <div className='chat-header-yellow' />
        <div className='chat-header-green' />
      </div>
      <div className='chat-body'>
        {messageList.map((messageContent) => {
          return <h1>{messageContent.message}</h1>
        })}
      </div>
      <div className='chat-footer'>
        <input
          className='chat-message-input'
          type='text' placeholder='Type Your Message...'
          onChange={(event) => { setMessage(event.target.value) }} />
        <button
          className='chat-message-button'
          onClick={sendMessage}>
          <span className='chat-send-icon'>&#9658;</span>
        </button>
      </div>
    </div>
  )
}

export default Chat;