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
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const userCookie = Cookies.get('user');
            if (!userCookie) {
                navigate('/login');
                return;
            }

            try {
                setUser(JSON.parse(userCookie));
                const response = await getUsers();
                if (response.data) {
                    setUsers(Array.isArray(response.data) ? response.data : [response.data]);
                    setError(null);
                }
            } catch (err) {
                console.error("Failed to fetch users:", err);
                // Don't show error on first load
                setUsers([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [navigate]);
    
    // Remove the separate useEffect for getUsers since we moved it above
    
    useEffect(() => {
        // Fetch orders data remains the same
        getOrders()
            .then((res) => {
                if (Array.isArray(res.data) && res.data.length > 0) {
                    // Find the latest non-completed order
                    const orders = res.data;
                    const activeOrder = orders.reverse().find(order => 
                        order.status?.toLowerCase() !== 'ready for delivery'
                    );
                    setLatestOrder(activeOrder);
                    setError(null);
                } else {
                    setLatestOrder(null);
                }
            })
            .catch((err) => {
                console.error("Failed to fetch orders:", err);
                setLatestOrder(null);
            });
    }, []);

    const totalDue = users.length > 0 ? users[0].total_due : "0.00";
    const totalOrders = users.length > 0 ? users[0].total_orders : "0";

    return (
        <div className="min-h-screen bg-white flex">
            <Sidenav isOpen={isNavOpen} onToggle={() => setIsNavOpen(!isNavOpen)} />
            
            <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section remains the same */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {[...Array(4)].map((_, index) => (
                                <div key={index} className="bg-white p-6 rounded-xl border border-gray-100">
                                    <div className="animate-pulse space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="bg-gray-200 h-12 w-12 rounded-xl"></div>
                                            <div className="bg-gray-200 h-6 w-20 rounded-full"></div>
                                        </div>
                                        <div className="bg-gray-200 h-8 w-24 rounded"></div>
                                        <div className="bg-gray-200 h-4 w-16 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : error ? (
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
                                    <button 
                                        onClick={() => navigate('/my-orders')} 
                                        className="text-sm text-blue-600 hover:text-blue-700"
                                    >
                                        View all
                                    </button>
                                </div>
                                {latestOrder && (
                                    <OrderStatus
                                        orderId={latestOrder.id}
                                        status={latestOrder.status}
                                        fileName={latestOrder.custom_pdf_url ? latestOrder.custom_pdf_url.split('/').pop() : 'No file'}
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
