import { useState, useEffect } from 'react'
import logo from './logo.svg'
import io from 'socket.io-client'
// import './App.css'

function App() {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io("http://localhost:8000");
    setSocket(newSocket);

    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {
    socket.on('connection', () => {
      console.log(socket.id);
    })
  }, [socket]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
      </header>
    </div>
  )
}

export default App
