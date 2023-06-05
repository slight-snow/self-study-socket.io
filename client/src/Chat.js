import React, { useEffect, useState } from 'react';

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
    <div>
      <div className='chat-header'>
        <p>Live Chat</p>
      </div>
      <div className='chat-body'>
        {messageList.map((messageContent) => {
          return <h1>{messageContent.message}</h1>
        })}
      </div>
      <div className='chat-footer'>
        <input type='text' placeholder='message...'
          onChange={(event) => { setMessage(event.target.value) }} />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat;