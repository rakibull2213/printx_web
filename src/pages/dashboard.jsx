import React, { useEffect, useState } from "react";
import Sidenav from "../components/sideNav";
import { User, DollarSign, TrendingUp, Activity, Wallet, Logs } from "lucide-react";
import OrderStatus from "../components/OrderStatus";
import { getUsers, getOrders } from "../api";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

const Dashboard = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [latestOrder, setLatestOrder] = useState(null);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userCookie = Cookies.get('user');
        if (userCookie) {
            setUser(JSON.parse(userCookie));
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    useEffect(() => {
        // Fetch user data
        getUsers()
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setUsers(res.data);
                } else {
                    setUsers([res.data]);
                }
            })
            .catch((err) => {
                console.error("Failed to fetch users:", err);
                setError("Error fetching users. Please try refreshing the page.");
                setUsers([]);
            });

        // Fetch orders data
        getOrders()
            .then((res) => {
                if (Array.isArray(res.data) && res.data.length > 0) {
                    // Get the latest order and set it | the latest order is the last one in the array
                    setLatestOrder(res.data[res.data.length - 1]);
                } else {
                    setError("No orders found.");
                    setLatestOrder(null);
                }
            })
            .catch((err) => {
                console.error("Failed to fetch orders:", err);
            });
    }, []);

    const totalDue = users.length > 0 ? users[0].total_due : "0.00";
    const totalOrders = users.length > 0 ? users[0].total_orders : "0";

    return (
        <div className="min-h-screen bg-white flex">
            <Sidenav isNavOpen={isNavOpen} toggleNav={toggleNav} />
            
            <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                        <div className="mb-4 md:mb-0">
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Welcome Back! {user ? user.name : 'Loading...'}</h1>
                            <p className="mt-1 text-sm text-gray-500">Here's what's happening with your orders.</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                <Activity className="h-4 w-4 mr-2" />
                                View Analytics
                            </button>
                        </div>
                    </div>

                    {error ? (
                        <div className="text-center p-6 bg-red-50 rounded-xl border border-red-100">
                            <div className="text-red-600">{error}</div>
                        </div>
                    ) : (
                        <>
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                <div className="bg-white p-6 rounded-xl border border-gray-100 hover:border-blue-500 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 rounded-xl bg-blue-50">
                                            <DollarSign size={24} className="text-blue-600" />
                                        </div>
                                        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                                            +12.5%
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalDue} Tk</h3>
                                    <p className="text-sm text-gray-500">Total Due</p>
                                </div>

                                <div className="bg-white p-6 rounded-xl border border-gray-100 hover:border-purple-500 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 rounded-xl bg-purple-50">
                                            <Logs size={24} className="text-purple-600" />
                                        </div>
                                        <span className="text-sm font-medium text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full">
                                            +{totalOrders}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{totalOrders}</h3>
                                    <p className="text-sm text-gray-500">Total Orders</p>
                                </div>

                                <div className="bg-white p-6 rounded-xl border border-gray-100 hover:border-green-500 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 rounded-xl bg-green-50">
                                            <Wallet size={24} className="text-green-600" />
                                        </div>
                                        <span className="text-sm font-medium text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full">
                                            Active
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-1">5.00 TK</h3>
                                    <p className="text-sm text-gray-500">Wallet Balance</p>
                                </div>

                                <div className="bg-white p-6 rounded-xl border border-gray-100 hover:border-yellow-500 transition-all duration-300">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 rounded-xl bg-yellow-50">
                                            <Activity size={24} className="text-yellow-600" />
                                        </div>
                                        <span className="text-sm font-medium text-yellow-600 bg-yellow-50 px-2.5 py-0.5 rounded-full">
                                            Live
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-1">8.38%</h3>
                                    <p className="text-sm text-gray-500">Activity Rate</p>
                                </div>
                            </div>

                            {/* Recent Orders Section */}
                            <div className="bg-white rounded-xl border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                                    <button className="text-sm text-blue-600 hover:text-blue-700">View all</button>
                                </div>
                                {latestOrder && (
                                    <OrderStatus
                                        orderId={latestOrder.id}
                                        status={latestOrder.status}
                                        fileName={latestOrder.custom_pdf_url.split('/').pop()}
                                        totalPrice={latestOrder.total_price}
                                        pageCount={latestOrder.page_count}
                                        color={latestOrder.color}
                                        note={latestOrder.note}
                                        createdAt={latestOrder.created_at}
                                    />
                                )}
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
