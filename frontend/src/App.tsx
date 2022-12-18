import React from 'react';
import './App.sass';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { Header } from './Components/Header/Header';
import { Home } from './Components/HomePage/Home';
import { About } from './Components/About/About';
import { Grodno } from './Components/Grodno/Grodno'
import { Products } from './Components/Products/Products';
import { Farmstead } from './Components/Farmstead/Farmstead';
import { Page404 } from './Components/Page404/Page404';

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path='/about' element={<About />} />
                        <Route path='/product' element={<Products />} />
                        <Route path="/farmstead/:id" element={<Farmstead />} />
                        <Route path="/grodno" element={<Grodno />} />
                        <Route path="/error" element={<Page404 />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
