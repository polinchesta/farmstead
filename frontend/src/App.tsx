import React from 'react';
import './App.sass';
import '../src/ui/image/image.module.sass';
import '../src/ui/fonts/fonts.module.sass'; 
import '../src/ui/adaptive/adaptive.module.sass';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/HomePage/Home';
import { Header } from './ui/header/header';
import { Products } from './pages/Products/Products';
import { Farmstead } from './pages/Farmstead/Farmstead';
import { Grodno } from './pages/grodnoPage/grodno';
import { Registration } from './pages/Registration/Registration';
import { LoginPage } from './pages/loginPage/login';
import { FarmsteadAll } from './pages/FarmsteadAll/FarmsteadAll';
import { Page404 } from './pages/Page404/Page404';

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
