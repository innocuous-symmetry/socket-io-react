import { useState, useEffect } from 'react'
import logo from './logo.svg'
import { io } from 'socket.io-client'
// import './App.css'

function App() {
  useEffect(() => {
    const socket = io('ws://localhost:8000');

    socket.on('connect', ()=>console.log(socket.id))
    socket.on('connect_error', ()=>{
      setTimeout(()=>socket.connect(),5000)
    })

    return () => socket.close();
  }, []);

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
