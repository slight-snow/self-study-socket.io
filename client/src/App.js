import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import Chat from './Chat';

const socket = io.connect('http://localhost:3001');

function App() {
  // User State
  const [name, setName] = useState('');
  // Room State
  const [room, setRoom] = useState('');
  // Chat State
  const [showChat, setShowChat] = useState(false);

  // Message State
  const [messageReceived, setMessageReceived] = useState('');

  const joinRoom = () => {
    if (name !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived(data.message)
    })
  }, [socket]);

  return (
    <div className="App">
      {!showChat ?
        <div>
          <input placeholder='Name...' onChange={(event) => setName(event.target.value)} />
          <input placeholder='Room...' onChange={(event) => setRoom(event.target.value)} />
          <button onClick={joinRoom}>
            Join
          </button>
          <h1>Message:</h1>
          {messageReceived}
        </div>
        :
        <Chat socket={socket} name={name} room={room} />}
    </div>
  );
};

export default App;
