import { useState, useEffect } from 'react'
import io from 'socket.io-client'

import PlayerCard from './components/PlayerCard';

import "./styles.css";

function App() {
  const [state, setState] = useState({
    socket: null,
    id: null,
    players: [],
    name: '',
  })

  useEffect(() => {
    const newSocket = io("http://localhost:8000");
    setState({...state, socket: newSocket});

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (state.socket) {
      state.socket.on('fire', (data) => {
        console.log(`fire: ${data}`);
        if (!state.players.length || !state.players.includes(data)) setState(() => {
          let newPlayers = state.players;
          newPlayers.push(data);
          return {
            ...state, players: newPlayers
          }
        });
      });
    }
  }, [state]);

  const handleJoin = () => {
    state.socket.emit('join', state.name);
  }

  return (
    <div className="App">
      <h1>Hello Vite + React!</h1>
      {<h2>Your socket ID is: {state.id || ''}</h2>}
      {<h3>Active players: {state.players || ''}</h3>}

      <input type="text" onChange={(e) => setState({...state, name: e.target.value})} />
      <button onClick={handleJoin}>Join</button>

      <div className="players">
        <div id="messages"></div>
        <h3>Players:</h3>
        {state.players ? state.players.map(player => <PlayerCard name={player} votes={null}/>) : null}
      </div>
    </div>
  )
}

export default App
