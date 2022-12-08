import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { Header } from './Components/Header/Header';

function App() {

  return (
    <div className="App">
      <Header />
    </div>
  )
}

export default App
