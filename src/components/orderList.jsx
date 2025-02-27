import React, { useState } from 'react';
import { CircleX, FileText, Clock } from 'lucide-react'; 
import { cancelOrder } from '../api';
import { toast } from 'react-toastify';
import ConfirmationModal from './ConfirmationModal';

const OrderList = ({ orders, onOrdersUpdate }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
            case 'accepted': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'printed': return 'bg-green-50 text-green-700 border-green-200';
            case 'ready for delivery': return 'bg-purple-50 text-purple-700 border-purple-200';
            case 'decline': return 'bg-red-50 text-red-700 border-red-200';
            default: return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    const handleCancelClick = (orderId) => {
        setSelectedOrderId(orderId);
        setIsModalOpen(true);
    };

    const handleConfirmCancel = async () => {
        try {
            await cancelOrder(selectedOrderId);
            toast.success('Order cancelled successfully');
            window.location.reload();
        } catch (error) {
            console.error('Failed to cancel order:', error);
            toast.error(error.response?.data?.message || 'Failed to cancel order');
        } finally {
            setIsModalOpen(false);
            setSelectedOrderId(null);
        }
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Order ID</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Document</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Pages</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Price</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Print Type</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Date</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orders
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-900">#{order.product_id || 'N/A'}</td>
                                        <td className="px-6 py-4">
                                            {order.custom_pdf_url ? (
                                                <a 
                                                    href={`https://printx.geniieshop.com${order.custom_pdf_url.replace('orders', '').replace('pdfs', 'pdf')}`}
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
                                                >
                                                    <FileText className="h-4 w-4 mr-1" />
                                                    View PDF
                                                </a>
                                            ) : (
                                                <span className="text-sm text-gray-400">No PDF</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{order.page_count}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.total_price} TK</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{order.color}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <Clock className="h-4 w-4 mr-1 text-gray-400" />
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {order.status?.toLowerCase() === 'pending' ? (
                                                <button 
                                                    onClick={() => handleCancelClick(order.id)}
                                                    className="text-red-600 hover:text-red-700 transition-colors"
                                                    title="Cancel Order"
                                                >
                                                    <CircleX className="h-5 w-5" />
                                                </button>
                                            ) : null}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                    <div className="flex items-center">
                        <select
                            className="border border-gray-200 rounded-lg text-sm px-2 py-1"
                            value={rowsPerPage}
                            onChange={(e) => {
                                setRowsPerPage(parseInt(e.target.value, 10));
                                setPage(0);
                            }}
                        >
                            {[5, 10, 25].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 0}
                            className="px-3 py-1 border border-gray-200 rounded-lg text-sm disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-gray-600">
                            Page {page + 1} of {Math.ceil(orders.length / rowsPerPage)}
                        </span>
                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page >= Math.ceil(orders.length / rowsPerPage) - 1}
                            className="px-3 py-1 border border-gray-200 rounded-lg text-sm disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedOrderId(null);
                }}
                onConfirm={handleConfirmCancel}
                title="Cancel Order"
                type="danger"
                message={
                    <div className="space-y-3">
                        <p>Are you sure you want to cancel this order? This action cannot be undone.</p>
                    </div>
                }
            />
        </>
    );
};

export default OrderList;