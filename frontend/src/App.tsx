import React from 'react';
import './App.sass';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { Header } from './Components/Header/Header';
import { Home } from './pages/HomePage/Home';
import { About } from './pages/About/About';
import { Grodno } from './pages/Grodno/Grodno'
import { Products } from './pages/Products/Products';
import { Farmstead } from './pages/Farmstead/Farmstead';
import { Page404 } from './pages/Page404/Page404';
import { Registration } from './pages/Registration/Registration';
import { LoginPage } from './pages/Login/LoginPage';
import { FarmsteadAll } from './pages/FarmsteadAll/FarmsteadAll';

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
                        <Route path="/signup" element={<Registration />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/farmsteadall" element={<FarmsteadAll />} />
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
