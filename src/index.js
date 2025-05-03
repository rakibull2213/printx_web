import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Landing from ".//pages/Landing";
import reportWebVitals from './reportWebVitals';
import Products from "./pages/products";

import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Dashboard from "./pages/dashboard";
import My_orders from "./pages/my_orders";
import Coupons from "./pages/coupons";
import PlaceOrders from "./pages/place_orders";
import NotFound from "./pages/NotFound";
import MaintenanceMode from "./pages/MaintenanceMode";
import { getSystemConfig } from "./api";

const AppWithMaintenanceCheck = () => {
    const [loading, setLoading] = useState(true);
    const [maintenanceMode, setMaintenanceMode] = useState(false);

    useEffect(() => {
        const checkMaintenanceMode = async () => {
            try {
                const config = await getSystemConfig();
                console.log('System config response:', config);
                console.log('Maintenance mode value:', config.maintenance_mode);
                console.log('Type of maintenance_mode:', typeof config.maintenance_mode);
                setMaintenanceMode(config.maintenance_mode === true || config.maintenance_mode === 'true');
            } catch (error) {
                console.error('Failed to check maintenance mode:', error);
            } finally {
                setLoading(false);
            }
        };

        checkMaintenanceMode();
    }, []);

    // Add debug log for current state
    console.log('Current maintenance mode state:', maintenanceMode);
    console.log('Current loading state:', loading);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <BrowserRouter>
            {maintenanceMode ? (
                <MaintenanceMode />
            ) : (
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    {/* eslint-disable-next-line react/jsx-pascal-case */}
                    <Route path="/my-orders" element={<My_orders />} />
                    <Route path="/coupon" element={<Coupons />} />
                    <Route path= "/place-order" element={<PlaceOrders />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            )}
        </BrowserRouter>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AppWithMaintenanceCheck />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
