import React from "react";
import { CheckCircle, Printer, Package, Clock, Truck, XCircle, XSquare } from "lucide-react";
import { cancelOrder } from "../api";
import { toast } from 'react-toastify';

const OrderStatus = ({ orderId, expectedArrival, trackingNumber, status, fileName, totalPrice, pageCount, color, note, createdAt }) => {
    const statusSteps = [
        { 
            key: "Pending", 
            label: "Order Processed",
            icon: Clock,
            color: "blue",
            title: "Order Received"
        },
        { 
            key: "Accepted", 
            label: "Order Accepted",
            icon: Package,
            color: "purple",
            title: "Order in Progress"
        },
        { 
            key: "Printed", 
            label: "Printed",
            icon: Printer,
            color: "green",
            title: "Order Printed"
        },
        { 
            key: "Ready for Delivery", 
            label: "Ready for Delivery",
            icon: Truck,
            color: "indigo",
            title: "Ready for Delivery"
        },
        { 
            key: "Decline", 
            label: "Declined",
            icon: XCircle,
            color: "red",
            title: "Order Declined"
        }
    ];

    // Remove toLowerCase() since status values are case-sensitive
    const currentStepIndex = statusSteps.findIndex((step) => step.key === status);
    const currentStatus = statusSteps.find((step) => step.key === status) || statusSteps[0];
    
    // Calculate expected delivery date (next day from created_at)
    const getExpectedDelivery = (createdAt) => {
        const date = new Date(createdAt);
        date.setDate(date.getDate() + 1);
        return date.toLocaleDateString();
    };

    // Get color based on current step
    const getStatusColor = (index) => {
        if (index <= currentStepIndex) {
            return statusSteps[index].color;
        }
        return "gray";
    };

    const handleCancelOrder = async () => {
        try {
            await cancelOrder(orderId);
            toast.success("Order cancelled successfully");
            // You might want to add a callback to refresh the order status
            window.location.reload();
        } catch (error) {
            toast.error("Failed to cancel order");
            console.error("Error cancelling order:", error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl">
            {/* Order Header */}
            <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 
                    ${status === 'Decline' ? 'bg-red-50' : 'bg-green-50'}`}>
                    {status === 'Decline' ? (
                        <XCircle size={32} className="text-red-600" />
                    ) : (
                        <CheckCircle size={32} className="text-green-600" />
                    )}
                </div>
                <h1 className={`text-2xl font-bold mb-2 ${status === 'Decline' ? 'text-red-600' : 'text-gray-900'}`}>
                    {currentStatus.title}
                </h1>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                    {status === 'Decline' 
                        ? 'Unfortunately, your order has been declined. This could be due to various reasons. Please check your email for more details or contact support for assistance.'
                        : status === 'Ready for Delivery'
                        ? 'Your order is ready for delivery.'
                        : 'Your order has been processed and is being prepared. Track its progress below.'}
                </p>
                {status === 'Pending' && (
                    <div className="mt-4">
                        <button
                            onClick={handleCancelOrder}
                            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            <XSquare className="h-4 w-4 mr-2" />
                            Cancel Order
                        </button>
                    </div>
                )}
                {status === 'Decline' && (
                    <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-100">
                        <p className="text-sm text-red-700">
                            If you have any questions about why your order was declined, 
                            please contact our support team for assistance.
                        </p>
                        <button className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                            Contact Support
                        </button>
                    </div>
                )}
            </div>

            {/* Rest of the component remains the same */}
            {/* Order Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Order ID</span>
                        <span className="text-sm font-medium text-gray-900">#{orderId}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Pages</span>
                        <span className="text-sm font-medium text-gray-900">{pageCount} pages</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Print Type</span>
                        <span className="text-sm font-medium text-gray-900">{color}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Total Price</span>
                        <span className="text-sm font-medium text-gray-900">{totalPrice} TK</span>
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Order Date</span>
                        <span className="text-sm font-medium text-gray-900">
                            {new Date(createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Expected Delivery</span>
                        <span className="text-sm font-medium text-gray-900">
                            {getExpectedDelivery(createdAt)}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Tracking Number</span>
                        <span className="text-sm font-medium text-gray-900">TRACK123456</span>
                    </div>
                    {note && (
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Note</span>
                            <span className="text-sm font-medium text-gray-900">{note}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Progress Timeline */}
            <div className="relative">
                {/* Progress Line */}
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
                    <div 
                        className={`h-full transition-all duration-500 ${status === 'Decline' ? 'bg-red-600' : 'bg-blue-600'}`}
                        style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
                    ></div>
                </div>

                {/* Steps */}
                <div className="relative flex justify-between">
                    {statusSteps.map((step, index) => {
                        const StepIcon = step.icon;
                        const color = getStatusColor(index);
                        const isActive = index <= currentStepIndex;
                        const isDeclined = status === 'Decline' && index === currentStepIndex;

                        // Define background classes based on status
                        let bgClass = 'bg-gray-100 text-gray-400';
                        if (isDeclined) {
                            bgClass = 'bg-red-100 text-red-600 ring-2 ring-red-600';
                        } else if (isActive) {
                            if (step.key === 'Ready for Delivery') {
                                bgClass = 'bg-indigo-100 text-indigo-600 ring-2 ring-indigo-600';
                            } else {
                                bgClass = `bg-${color}-100 text-${color}-600 ring-2 ring-${color}-600`;
                            }
                        }

                        return (
                            <div key={step.key} className="flex flex-col items-center">
                                <div className={`
                                    w-10 h-10 rounded-full flex items-center justify-center 
                                    transition-all duration-300 ${bgClass}
                                `}>
                                    <StepIcon size={20} />
                                </div>
                                <p className={`
                                    mt-2 text-xs font-medium
                                    ${isDeclined 
                                        ? 'text-red-600'
                                        : isActive 
                                        ? step.key === 'Ready for Delivery'
                                            ? 'text-indigo-600'
                                            : `text-${color}-600`
                                        : 'text-gray-500'
                                    }
                                `}>
                                    {step.label}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default OrderStatus;