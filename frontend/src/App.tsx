import React from 'react';
import './App.sass';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { Header } from './Components/header/header';
import { Home } from './pages/homePage/home';
import { Grodno } from './pages/grodnoPage/grodno'
import { Products } from './pages/products/products';
import { Farmstead } from './pages/farmstead/farmstead';
import { Page404 } from './pages/page404/page404';
import { Registration } from './pages/registration/registration';
import { LoginPage } from './pages/loginPage/login';
import { FarmsteadAll } from './pages/farmsteadAll/farmsteadAll';

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <div>
                    <Routes>
                        <Route path="/" element={<Home />} />
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
