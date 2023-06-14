import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';

const socket = io.connect('http://localhost:3001');

function App() {
  // User State
  const [name, setName] = useState('');
  // Room State
  const [room, setRoom] = useState('');
  // Show State
  const [show, setShow] = useState(false);

  const joinRoom = () => {
    if (name !== '' && room !== '') {
      socket.emit('join_room', room);
      setShow(true);
    }
  };

  return (
    <div className='App'>
      {!show ?
        <div className='join-container' >
          <div className='join-title'>
            <div className='join-title-type-b'>LET'S</div>
            <div>CHAT</div>
          </div>
          <div className='name-box'>
            <div className='name-title'>
              <img className='name-icon' src={process.env.PUBLIC_URL + 'user_name.png'} />
              <span className='name-title-text'>NAME</span>
            </div>
            <input
              className='name-input'
              placeholder='Enter Your Name...'
              onChange={(event) => setName(event.target.value)} />
          </div>
          <div className='room-box'>
            <div className='room-title'>
              <img className='room-icon' src={process.env.PUBLIC_URL + 'enter_room.png'} />
              <span className='room-title-text'>ROOM</span>
            </div>
            <input
              className='room-input'
              placeholder='Enter Room Number...'
              onChange={(event) => setRoom(event.target.value)} />
          </div>
          <div className='button-box'>
            <button
              className='join-button'
              onClick={joinRoom}>
              Join A Room
            </button>
          </div>
        </div>
        :
        <Chat socket={socket} name={name} room={room} />
      }
    </div>
  );
};

export default App;
