import React from 'react';
import { X, AlertCircle } from 'lucide-react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, type = 'danger' }) => {
    if (!isOpen) return null;

    const getColorScheme = () => {
        switch (type) {
            case 'success':
                return {
                    bg: 'bg-green-50',
                    text: 'text-green-600',
                    button: 'bg-green-600 hover:bg-green-700',
                };
            case 'danger':
                return {
                    bg: 'bg-red-50',
                    text: 'text-red-600',
                    button: 'bg-red-600 hover:bg-red-700',
                };
            default:
                return {
                    bg: 'bg-blue-50',
                    text: 'text-blue-600',
                    button: 'bg-blue-600 hover:bg-blue-700',
                };
        }
    };

    const colors = getColorScheme();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl transform transition-all">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className={`p-2 ${colors.bg} rounded-full`}>
                            <AlertCircle className={`w-6 h-6 ${colors.text}`} />
                        </div>
                        <h3 className={`text-lg font-semibold ${colors.text}`}>{title}</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
                
                <p className="text-gray-600 mb-6">{message}</p>
                
                <div className="flex space-x-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`flex-1 px-4 py-2 text-white ${colors.button} rounded-lg transition-colors`}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;