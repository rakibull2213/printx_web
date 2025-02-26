import React, { useEffect, useState } from 'react';
import Sidenav from '../components/sideNav';
import { getOrders } from "../api";
import { Search } from 'lucide-react';
import OrderList from '../components/orderList';  // Add this import

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getOrders()
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setOrders(res.data);
                } else {
                    setOrders([res.data]);
                }
            })
            .catch((err) => {
                console.error("Failed to fetch orders:", err);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidenav />
            <main className="flex-1 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Manage and track all your print orders
                            </p>
                        </div>
                        
                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search orders..."
                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <OrderList orders={orders.filter(order => 
                        order.product_id?.toString().includes(searchQuery) ||
                        order.status?.toLowerCase().includes(searchQuery.toLowerCase())
                    )} />
                </div>
            </main>
        </div>
    );
}