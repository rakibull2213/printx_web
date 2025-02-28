import React, { useEffect, useState } from "react";
import { Home, Settings, LogOut, Menu, FileUp, Archive, BadgeDollarSign , PackageOpen} from "lucide-react";
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
                                <p className="text-sm text-gray-500"> {user ? user.student_id : "Loading..."}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Section */}
                    <nav className="space-y-1 flex-1">
                        <NavLink href="/dashboard" icon={Home}>Overview</NavLink>
                        <NavLink href="/products" icon={PackageOpen}>Materials</NavLink>
                        <NavLink href="/place-order" icon={FileUp}>Place Order</NavLink>
                        <NavLink href="/my-orders" icon={Archive}>My Orders</NavLink>
                        <NavLink href="/coupon" icon={BadgeDollarSign}>All Coupons</NavLink>
                        <NavLink href="#" icon={Settings}>Settings</NavLink>
                    </nav>
                    
                    {/* Download App Button */}
                    <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-blue-900">PrintX Mobile</h3>
                                <p className="text-sm text-blue-600">Get our mobile app</p>
                            </div>
                            <a 
                                href="https://printx.en.uptodown.com/android" 
                                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                    <polyline points="7 10 12 15 17 10"/>
                                    <line x1="12" y1="15" x2="12" y2="3"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    
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
