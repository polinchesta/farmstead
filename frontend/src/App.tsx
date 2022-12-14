import React from 'react';
import './App.sass';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { Header } from './Components/Header/Header';
import { Home } from './Components/HomePage/Home';
import { About } from './Components/About/About';
import { Grodno } from './Components/Grodno/Grodno'

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path='/about' element={<About/>} />
                        <Route path="/grodno" element={<Grodno />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
