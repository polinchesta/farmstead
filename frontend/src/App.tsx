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
import { Grodno } from './pages/grodnoPage/grodno';
import { Registration } from './pages/Registration/Registration';
import { LoginPage } from './pages/loginPage/login';
import { Page404 } from './pages/Page404/Page404';
import { Farmsteads } from './pages/Farmstead/Farmsteads';
import ItemProduct from './pages/Products/ItemProducts/ItemProducts';
import ItemFarmstead from './pages/Farmstead/farmsteadItem/ItemFarmstead';


function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path='/product' element={<Products />} />
                        <Route path='/farmstead' element={<Farmsteads />} />
                        <Route path="/grodno" element={<Grodno />} />
                        <Route path="/signup" element={<Registration />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/farmstead/:id" element={<ItemFarmstead />} />
                        <Route path="*" element={<Page404 />} />
                        <Route path="/product/:id" element={<ItemProduct />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
