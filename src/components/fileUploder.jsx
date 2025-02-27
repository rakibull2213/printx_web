import React, { useState } from "react";
import { PDFDocument } from "pdf-lib"; // Import pdf-lib to handle PDF operations
const FileUpload = ({ onUpload }) => {
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);
    const [totalPages, setTotalPages] = useState(0);

    const perPagePrice = 2;
    const colorPageMultiplier = 2;
    const isColorPrint = true;

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (!selectedFile || selectedFile.type !== "application/pdf") {
            alert("Only PDF files are allowed.");
            return;
        }

        setFile(selectedFile);
        setUploadProgress(0);
        setIsUploading(false);
        setUploadComplete(false);
        countPdfPages(selectedFile);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];

        if (!droppedFile || droppedFile.type !== "application/pdf") {
            alert("Only PDF files are allowed.");
            return;
        }

        setFile(droppedFile);
        setUploadProgress(0);
        setIsUploading(false);
        setUploadComplete(false);
        countPdfPages(droppedFile);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const countPdfPages = async (pdfFile) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(pdfFile);
        fileReader.onload = async () => {
            try {
                const pdfDoc = await PDFDocument.load(fileReader.result);
                setTotalPages(pdfDoc.getPageCount());
            } catch (error) {
                console.error("Error loading PDF:", error);
                alert("Failed to load PDF. Please try again.");
            }
        };
    };

    const handleUpload = () => {
        if (!file) return;

        setIsUploading(true);
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setIsUploading(false);
                setUploadComplete(true);


                const perPageCost = isColorPrint ? perPagePrice * colorPageMultiplier : perPagePrice;

                const orderData = [
                    {   file: file,
                        name: file.name,
                        quantity: totalPages,
                        price: perPageCost,
                    },
                    {
                        name: "Delivery Fee",
                        quantity: 1,
                        price: 0.00,
                    },


                ];

                onUpload(orderData); // Pass the order data to the parent component (optional)
            }
        }, 300);
    };

    const handleCancel = () => {
        setFile(null);
        setUploadProgress(0);
        setIsUploading(false);
        setUploadComplete(false);
        setTotalPages(0);
    };

    return (
        <div className="p-6">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    {/* Header */}
                    <div className="border-b border-gray-200 p-4">
                        <h2 className="text-lg font-semibold text-gray-900">Upload PDF Document</h2>
                        <p className="text-sm text-gray-500 mt-1">Maximum file size: 10MB</p>
                    </div>
                    {/* Upload Area */}
                    <div className="p-6">
                        <div 
                            className={`border-2 border-dashed rounded-lg p-6 text-center
                                ${file ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-blue-400'}`}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                        >
                            {file ? (
                                <div>
                                    <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                    <p className="text-xs text-gray-500 mt-1">{Math.round(file.size / 1024)} KB • {totalPages} Pages</p>
                                </div>
                            ) : (
                                <div>
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <p className="mt-2 text-sm text-gray-600">Drag and drop your PDF here, or</p>
                                    <label className="mt-2 inline-block">
                                        <span className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">Browse files</span>
                                        <input type="file" className="hidden" onChange={handleFileChange} accept="application/pdf" />
                                    </label>
                                </div>
                            )}
                        </div>
                        {/* File Info & Progress */}
                        {file && (
                            <div className="mt-6 space-y-4">
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <span className="text-sm text-gray-600">{file.name}</span>
                                        </div>
                                        <span className="text-sm text-gray-500">{totalPages} pages</span>
                                    </div>
                                    <div className="relative">
                                        <div className="h-2 bg-gray-200 rounded">
                                            <div 
                                                className="h-2 bg-blue-600 rounded transition-all duration-300"
                                                style={{ width: `${uploadProgress}%` }}
                                            ></div>
                                        </div>
                                        {isUploading && (
                                            <span className="absolute right-0 -top-6 text-xs text-gray-500">
                                                {uploadProgress}%
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex space-x-3">
                                    <button
                                        onClick={handleUpload}
                                        disabled={isUploading || uploadComplete}
                                        className={`flex-1 px-4 py-2 text-sm font-medium rounded-md
                                            ${uploadComplete 
                                                ? 'bg-green-600 text-white hover:bg-green-700' 
                                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                            } disabled:opacity-50`}
                                    >
                                        {uploadComplete ? 'File Uploaded' : 'Upload File'}
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
