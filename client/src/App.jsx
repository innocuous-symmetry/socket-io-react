import { useState, useEffect } from 'react'
import io from 'socket.io-client'

import PlayerCard from './components/PlayerCard';

import "./styles.css";

function App() {
  const [socket, setSocket] = useState();
  const [state, setState] = useState({
    socket: null,
    players: null,
    id: null,
  })

  useEffect(() => {
    const newSocket = io("http://localhost:8000");
    setState({...state, socket: newSocket});

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (state.socket) {
      state.socket.on('connect', (data) => {
        console.log("connection to Express successful!");
        console.log(data);

        setState({
          ...state,
          id: state.socket.id,
          players: data
        });

        // state.socket.emit('connect', null);
      })
    }
  }, [state.socket]);

  return (
    <div className="App">
      <h1>Hello Vite + React!</h1>
      {<h2>Your socket ID is: {state.id || ''}</h2>}
      {<h3>Active players: {state.players || ''}</h3>}

      <div className="players">
        <PlayerCard name="Me" votes={null} />
      </div>
    </div>
  )
}

export default App
