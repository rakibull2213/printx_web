import React, { useState } from "react";
import Sidenav from "../components/sideNav";
import FileUpload from "../components/fileUploder";
import OrderSummary from "../components/OrderSummary";
import { PlaceOrders as placeOrderApi } from "../api";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlaceOrders = () => {
    const [fileUploaded, setFileUploaded] = useState(false);
    const [orderItems, setOrderItems] = useState([]);
    const [uploadedFile, setUploadedFile] = useState(null);
    const navigate = useNavigate();

    const handleFileUpload = (uploadedItems) => {
        // Check if uploadedItems has the file property
        if (uploadedItems && uploadedItems[0]?.file) {
            const file = uploadedItems[0].file;
            if (file.type === 'application/pdf') {
                setOrderItems(uploadedItems);
                setUploadedFile(file);
                setFileUploaded(true);
            } else {
                toast.error('Please upload a valid PDF file');
            }
        } else {
            toast.error('No file uploaded');
        }
    };

    const handlePlaceOrder = async (orderData) => {
        try {
            if (!uploadedFile || uploadedFile.type !== 'application/pdf') {
                toast.error('Please upload a valid PDF file');
                return;
            }

            const formData = new FormData();
            formData.append('pdf_file', uploadedFile, uploadedFile.name);
            formData.append('total_price', orderData.total_price);
            formData.append('page_count', orderData.page_count);
            formData.append('note', orderData.note);
            formData.append('color', orderData.color);
           // formData.append('coupon_code', orderData.coupon_code || '');

            const response = await placeOrderApi(formData);
            if (response.data) {
                toast.success('Order placed successfully!');
                navigate('/my-orders');
            }
        } catch (error) {
            const errors = error.response?.data?.errors;
            if (errors) {
                // Show specific error messages for each field
                if (errors.pdf_file) {
                    toast.error(`PDF Error: ${errors.pdf_file[0]}`);
                }
                if (errors.total_price) {
                    toast.error(`Price Error: ${errors.total_price[0]}`);
                }
                if (errors.page_count) {
                    toast.error(`Page Count Error: ${errors.page_count[0]}`);
                }
                if (errors.color) {
                    toast.error(`Color Error: ${errors.color[0]}`);
                }
                if (errors.note) {
                    toast.error(`Note Error: ${errors.note[0]}`);
                }
                if( errors.coupon_code) {
                    toast.error(`Coupon Code Error: ${errors.coupon_code[0]}`);
                }


            } else {
                toast.error('Failed to place order. Please try again.');
            }
            console.error('Order placement failed:', error.response?.data);
        }
    };

    return (
        <div className="flex min-h-screen bg-white">
            <ToastContainer />
            <Sidenav />
            <main className="flex-1 p-4 lg:p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="bg-white  rounded-xl p-6 mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                            <div>
                                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Place Orders</h1>
                                <p className="mt-1 text-sm text-gray-500">Upload your PDF file and customize your print options</p>
                            </div>
                            <div className="mt-4 sm:mt-0 flex items-center gap-2 text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm font-medium">Need Help?</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress Steps */}
                    <div className="bg-white  p-6 mb-6">
                        <div className="max-w-3xl mx-auto">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                                        fileUploaded ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                                    }`}>
                                        <span className="text-lg font-semibold">1</span>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900">Upload PDF</p>
                                        <p className="text-xs text-gray-500">Max size 10MB</p>
                                    </div>
                                </div>
                                <div className="flex-1 mx-4">
                                    <div className="h-1 bg-gray-200 rounded-full">
                                        <div className={`h-1 rounded-full transition-all duration-500 ${
                                            fileUploaded ? 'bg-green-500 w-full' : 'bg-blue-500 w-0'
                                        }`}></div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                                        fileUploaded ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                                    }`}>
                                        <span className="text-lg font-semibold">2</span>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900">Review Order</p>
                                        <p className="text-xs text-gray-500">Confirm details</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className={`${fileUploaded ? "lg:w-2/3" : "w-full"} transition-all duration-300`}>
                            <div className="bg-white h-full">
                                <FileUpload onUpload={handleFileUpload} />
                            </div>
                        </div>
                        {fileUploaded && orderItems.length > 0 && (
                            <div className="lg:w-1/3 lg:sticky lg:top-6">
                                <div className="bg-white border border-gray-100 rounded-xl shadow-sm">
                                    <OrderSummary 
                                        items={orderItems} 
                                        onPlaceOrder={handlePlaceOrder}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PlaceOrders;
