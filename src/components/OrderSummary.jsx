import React, { useState } from 'react';

const OrderSummary = ({ items, onPlaceOrder }) => {
    const [note, setNote] = useState('');
    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleSubmit = () => {
        const orderData = {
            total_price: totalPrice,
            page_count: items[0]?.quantity || 0,
            note: note,
            color: 'Color',
           // coupon_code: 'wlc10'
        };
        onPlaceOrder(orderData);
    };

    return (
        <div className="p-6 bg-white rounded-lg max-w-md mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Order Summary</h2>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    PDF Print
                </span>
            </div>

            {/* Print Specifications */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Print Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs text-gray-500">Print Type</p>
                        <p className="text-sm font-medium text-gray-900">Color Print</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Pages</p>
                        <p className="text-sm font-medium text-gray-900">{items[0]?.quantity || 0}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Paper Size</p>
                        <p className="text-sm font-medium text-gray-900">A4</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Paper Type</p>
                        <p className="text-sm font-medium text-gray-900">Standard</p>
                    </div>
                </div>
            </div>

            {/* Existing items list with better styling */}
            <div className="bg-white rounded-lg mb-4">
                <ul className="divide-y divide-gray-100">
                    {items.map((item, index) => (
                        <li key={index} className="py-3 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">
                                {(item.price * item.quantity).toFixed(2)} TK
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Total with better styling */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Subtotal</span>
                    <span className="text-sm font-medium text-gray-900">{totalPrice.toFixed(2)} TK</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Delivery Fee</span>
                    <span className="text-sm font-medium text-gray-900">0.00 TK</span>
                </div>
                <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between items-center">
                    <span className="text-base font-semibold text-gray-900">Total</span>
                    <span className="text-base font-semibold text-gray-900">{totalPrice.toFixed(2)} TK</span>
                </div>
            </div>

            {/* Note section with better styling */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Instructions
                </label>
                <textarea
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                    placeholder="Add any special instructions for your print..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
            </div>

            {/* Place Order button with better styling */}
            <button 
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Place Order
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
                By placing this order, you agree to our Terms of Service and Privacy Policy
            </p>
        </div>
    );
};

export default OrderSummary;
