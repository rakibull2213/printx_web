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
        <div className="flex justify-between p-6">
            <div className="flex-1 flex items-center justify-center rounded-xl">
                <div className="bg-white p-8 rounded-2xl w-full max-w-2xl mx-auto shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-bold text-gray-800">
                            Upload Your PDF
                            <p className="text-sm text-gray-500 mt-1">Maximum file size: 10MB</p>
                        </h2>
                        <div className="bg-blue-50 p-2 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                    </div>

                    {/* Info Cards */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-xl">
                            <h3 className="font-semibold text-blue-700">Supported Format</h3>
                            <p className="text-sm text-blue-600">PDF files only</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-xl">
                            <h3 className="font-semibold text-green-700">Print Quality</h3>
                            <p className="text-sm text-green-600">300 DPI or higher</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-xl">
                            <h3 className="font-semibold text-purple-700">Processing Time</h3>
                            <p className="text-sm text-purple-600">0-1 business days</p>
                        </div>
                    </div>

                    {/* Existing upload area with modifications */}
                    <div className="border-2 border-dashed border-blue-200 rounded-2xl p-8 mb-6 text-center cursor-pointer transition-all duration-300 hover:border-blue-400 hover:bg-blue-50/50"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        {file ? (
                            <div className="space-y-4">
                                <div className="flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-lg font-semibold text-gray-700">{file.name}</p>
                                    <p className="text-sm text-gray-500">{Math.round(file.size / 1024)} KB • {file.type}</p>
                                    <p className="text-sm font-medium text-blue-600">{totalPages} Pages</p>
                                </div>
                                <div className="flex justify-center gap-3 mt-6">
                                    <label htmlFor="file-input" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2 shadow-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                        Choose Another File
                                        <input id="file-input" type="file" className="hidden" onChange={handleFileChange} accept="application/pdf" />
                                    </label>
                                    <button
                                        onClick={handleCancel}
                                        className="px-6 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-300 flex items-center gap-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-lg font-medium text-gray-700">Drag and drop your PDF here</p>
                                    <p className="text-sm text-gray-500 mt-2">or</p>
                                    <label htmlFor="file-input" className="inline-block mt-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-300">
                                        Browse Files
                                        <input id="file-input" type="file" className="hidden" onChange={handleFileChange} accept="application/pdf" />
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>

                    {file && (
                        <div className="mb-6 bg-gray-50 p-4 rounded-xl">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span className="font-medium text-gray-700">{file.name}</span>
                                </div>
                                <span className="text-sm font-medium text-blue-600">{totalPages} Pages</span>
                            </div>
                            <div className="relative pt-1">
                                <div className="overflow-hidden h-2 text-xs flex rounded-full bg-blue-100">
                                    <div 
                                        className="transition-all duration-300 ease-out shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                                        style={{ width: `${uploadProgress}%` }}
                                    ></div>
                                </div>
                                {isUploading && (
                                    <p className="absolute right-0 top-[-20px] text-sm font-medium text-blue-600">
                                        Uploading... {uploadProgress}%
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    <button
                        className={`w-full py-3 px-4 rounded-xl text-white font-medium transition-all duration-300 flex items-center justify-center gap-2
                            ${uploadComplete 
                                ? 'bg-green-600 hover:bg-green-700' 
                                : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200'
                            }`}
                        onClick={uploadComplete ? () => {} : handleUpload}
                        disabled={isUploading}
                    >
                        {uploadComplete ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                DONE
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                UPLOAD
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
