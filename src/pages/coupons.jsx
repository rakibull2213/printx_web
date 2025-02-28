import React, { useState, useEffect } from 'react';
import Sidenav from '../components/sideNav';
import { BadgeDollarSign, Copy, CheckCircle, Calendar, Clock } from 'lucide-react';
import { getCoupons } from '../api';
import { toast } from 'react-toastify';

const Coupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copiedCode, setCopiedCode] = useState(null);

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            const response = await getCoupons();
            setCoupons(response.data);
        } catch (error) {
            toast.error('Failed to fetch coupons');
        } finally {
            setLoading(false);
        }
    };

    const handleCopyCode = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        toast.success('Coupon code copied!');
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidenav />
            <main className="flex-1 p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Available Coupons</h1>
                            <p className="text-gray-600 mt-1">Use these coupons to save on your next print order</p>
                        </div>
                        <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
                            <BadgeDollarSign className="text-blue-600" size={20} />
                            <span className="text-blue-600 font-medium">{coupons.length} Active Coupons</span>
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                    {/* Header Shimmer */}
                                    <div className="p-6 bg-gray-50">
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="animate-pulse bg-gray-200 h-6 w-24 rounded-full"></div>
                                            <div className="animate-pulse bg-gray-200 h-6 w-20 rounded-full"></div>
                                        </div>
                                        <div className="animate-pulse bg-gray-200 h-8 w-32 rounded mb-2"></div>
                                        <div className="animate-pulse bg-gray-200 h-5 w-36 rounded"></div>
                                    </div>

                                    {/* Content Shimmer */}
                                    <div className="p-6">
                                        <div className="bg-gray-50 px-4 py-3 rounded-lg mb-4">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-2">
                                                    <div className="animate-pulse bg-gray-200 h-3 w-16 rounded"></div>
                                                    <div className="animate-pulse bg-gray-200 h-5 w-24 rounded"></div>
                                                </div>
                                                <div className="animate-pulse bg-gray-200 h-6 w-6 rounded"></div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        // Original coupon cards remain the same
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {coupons.map((coupon) => (
                                <div 
                                    key={coupon.id}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
                                >
                                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                                                {coupon.discount_type}
                                            </span>
                                            <span className="text-white/80 text-sm">
                                                {coupon.usage_limit} uses left
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2">
                                            {coupon.discount_type === 'Fixed' 
                                                ? `${coupon.discount_value} TK` 
                                                : `${coupon.discount_value}%`} OFF
                                        </h3>
                                        <p className="text-blue-100 text-sm">
                                            Min. Order: {coupon.min_order_amount} TK
                                        </p>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg mb-4">
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">Promo Code</p>
                                                <p className="font-mono font-medium text-gray-900">{coupon.code}</p>
                                            </div>
                                            <button
                                                onClick={() => handleCopyCode(coupon.code)}
                                                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                                            >
                                                {copiedCode === coupon.code ? (
                                                    <CheckCircle size={20} className="text-green-500" />
                                                ) : (
                                                    <Copy size={20} />
                                                )}
                                            </button>
                                        </div>

                                        <div className="flex items-center text-sm text-gray-500">
                                            <Calendar size={16} className="mr-2" />
                                            Expires: {formatDate(coupon.expires_at)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Coupons;