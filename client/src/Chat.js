import React, { useEffect, useState, useRef } from 'react';
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
        time: String(new Date(Date.now()).getHours()).padStart(2, '0')
          + ':' + String(new Date(Date.now()).getMinutes()).padStart(2, '0'),
      }
    }

    await socket.emit('send_message', messageData);
    setMessageList((list) => [...list, messageData]);
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    })
    return () => {
      socket.off('receive_message');
    }
  }, [socket])

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messageList])

  const scrollRef = useRef();

  return (
    <div className='chat-container'>
      <div className='chat-header'>
        <div className='chat-header-red' />
        <div className='chat-header-yellow' />
        <div className='chat-header-green' />
      </div>
      <div className='chat-body'>
        {messageList.map((messageContent, index) => {
          return (
            <div key={index}>
              {messageContent.author === name ?
                <div key={messageContent}>
                  <div className='chat-my' key={messageContent.author}>
                    <div className='chat-my-time' key={messageContent.time}>{messageContent.time}</div>
                    <div className='chat-my-content' key={messageContent.message}>{messageContent.message}</div>
                  </div>
                </div>
                :
                <div key={messageContent}>
                  <div className='chat-other-author' key={messageContent.author}>{messageContent.author}:</div>
                  <div className='chat-other' key=''>
                    <div className='chat-other-content' key={messageContent.message}>{messageContent.message}</div>
                    <div className='chat-other-time' key={messageContent.time}>{messageContent.time}</div>
                  </div>
                </div>
              }
            </div>
          )
        })}
        <div ref={scrollRef}></div>
      </div>
      <div className='chat-footer'>
        <input
          className='chat-message-input'
          type='text' placeholder='Type Your Message...'
          value={message}
          onChange={(event) => { setMessage(event.target.value) }}
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              sendMessage()
              setMessage('')
            }
          }} />
        <button
          className='chat-message-button'
          onClick={sendMessage}>
          <span className='chat-send-icon'>&#9658;</span>
        </button>
      </div>
    </div >
  )
}

export default Chat;