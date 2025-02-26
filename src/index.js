import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Landing from ".//pages/Landing";
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Dashboard from "./pages/dashboard";
import My_orders from "./pages/my_orders";
import Coupons from "./pages/coupons";
import PlaceOrders from "./pages/place_orders";
import NotFound from "./pages/NotFound";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* eslint-disable-next-line react/jsx-pascal-case */}
                <Route path="/my-orders" element={<My_orders />} />
                <Route path="/coupon" element={<Coupons />} />
                <Route path= "/place-order" element={<PlaceOrders />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
