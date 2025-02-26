import React, { useEffect, useState } from "react";
import { Home, Settings, LogOut, Menu, FileUp, Archive, BadgeDollarSign } from "lucide-react";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../api";
import { toast } from 'react-toastify';

const Sidenav = ({ isNavOpen, toggleNav }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);

    //get the user from the cookie
    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            navigate('/login');
        }
        else {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            const userCookie = Cookies.get('user');
            if (userCookie) {
                setUser(JSON.parse(userCookie));
            }
        }
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await logout();
            // Clear cookies
            Cookies.remove('token');
            Cookies.remove('user');
            toast.success('Logged out successfully');
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            toast.error('Logout failed. Please try again.');
        }
    };

    const isActiveRoute = (route) => {
        return location.pathname === route;
    };

    const NavLink = ({ href, icon: Icon, children }) => {
        const isActive = isActiveRoute(href);
        return (
            <a
                href={href}
                className={`flex items-center p-3 rounded-xl transition-all duration-200 group
                    ${isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
            >
                <Icon
                    size={20}
                    className={`mr-3 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                        }`}
                />
                <span className="font-medium">{children}</span>
                {isActive && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-blue-600"></div>
                )}
            </a>
        );
    };

    return (
        <>
            <aside className={`bg-white w-72 min-h-screen border-r border-gray-100 flex flex-col 
                fixed top-0 left-0 transition-all duration-300 ease-in-out z-50 
                ${isNavOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                md:static shadow-lg md:shadow-none`}
            >
                <div className="flex flex-col h-full p-6">
                    {/* Logo Section */}
                    <div className="flex items-center mb-8">
                        <img
                            src="/logo.png"
                            alt="PrintX Logo"
                            className="h-10 w-auto"
                        />
                        <h2 className="text-2xl font-bold text-gray-800 ml-1">PrintX</h2>
                        <button
                            className="ml-auto md:hidden"
                            onClick={toggleNav}
                        >
                            <Menu size={24} />
                        </button>
                    </div>

                    {/* User Profile Section */}
                    <div className="mb-8 p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-semibold">
                                {user?.name?.charAt(0) || 'L'}
                            </div>
                            <div className="ml-3">
                                <p className="font-medium text-gray-900">
                                    {user ? user.name : 'Loading...'}
                                </p>
                                <p className="text-sm text-gray-500">Student</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Section */}
                    <nav className="space-y-1 flex-1">
                        <NavLink href="/dashboard" icon={Home}>Overview</NavLink>
                        <NavLink href="/place-order" icon={FileUp}>Place Order</NavLink>
                        <NavLink href="/my-orders" icon={Archive}>My Orders</NavLink>
                        <NavLink href="/coupon" icon={BadgeDollarSign}>All Coupons</NavLink>
                        <NavLink href="#" icon={Settings}>Settings</NavLink>
                    </nav>

                    {/* Logout Section */}
                    <div className="border-t border-gray-100 pt-4 mt-4">
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full p-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
                        >
                            <LogOut size={20} className="mr-3" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay */}
            {isNavOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                    onClick={toggleNav}
                ></div>
            )}
        </>
    );
};

export default Sidenav;
