import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Printer, FileText, Clock, Shield, ArrowRight } from 'lucide-react';
import Cookies from 'js-cookie';

const Landing = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        const user = Cookies.get('user');
        
        if (token && user) {
            navigate('/dashboard');
        }
    }, [navigate]);

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <img src="/logo.png" alt="PrintX" className="h-8 w-auto" />
                            <span className="ml-3 text-xl font-bold text-gray-900">PrintX</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button 
                                onClick={() => navigate('/login')}
                                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
                            >
                                Login
                            </button>
                            <button 
                                onClick={() => navigate('/signup')}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Print Your Documents <br />
                            <span className="text-blue-600">Quick & Easy</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Upload your PDFs and get high-quality prints delivered within your university campus.
                            Fast, reliable, and hassle-free printing service.
                        </p>
                        <button 
                            onClick={() => navigate('/signup')}
                            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium inline-flex items-center group"
                        >
                            Get Started 
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white p-6 rounded-xl">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <Printer className="text-blue-600" size={24} />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">High Quality Prints</h3>
                            <p className="text-gray-600">Get crystal clear prints with our professional grade printers.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <FileText className="text-green-600" size={24} />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Easy Upload</h3>
                            <p className="text-gray-600">Simply upload your PDF files and we'll handle the rest.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <Clock className="text-purple-600" size={24} />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Quick Turnaround</h3>
                            <p className="text-gray-600">Get your prints ready within hours, not days.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl">
                            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                                <Shield className="text-amber-600" size={24} />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Secure Service</h3>
                            <p className="text-gray-600">Your documents are handled with complete confidentiality.</p>
                        </div>
                    </div>
                </div>
            </section>
{/* How It Works Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                                1
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Create Account</h3>
                            <p className="text-gray-600">Sign up with your student ID and verify your account.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                                2
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Upload PDF</h3>
                            <p className="text-gray-600">Upload your document and specify printing preferences.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                                3
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Get Your Prints</h3>
                            <p className="text-gray-600">Collect your prints from our designated pickup point.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-4">Simple Pricing</h2>
                    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        Affordable printing solutions for every student's needs. No hidden charges.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-semibold mb-4">Black & White</h3>
                            <div className="mb-6">
                                <span className="text-4xl font-bold">2.00৳</span>
                                <span className="text-gray-600">/page</span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center text-gray-600">
                                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Standard A4 Paper
                                </li>
                                <li className="flex items-center text-gray-600">
                                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Single-sided Print
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-200 relative">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
                                Most Popular
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Double-sided B&W</h3>
                            <div className="mb-6">
                                <span className="text-4xl font-bold">3.00৳</span>
                                <span className="text-gray-600">/page</span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center text-gray-600">
                                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Premium A4 Paper
                                </li>
                                <li className="flex items-center text-gray-600">
                                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Double-sided Print
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-semibold mb-4">Color Print</h3>
                            <div className="mb-6">
                                <span className="text-4xl font-bold">4.00৳</span>
                                <span className="text-gray-600">/page</span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center text-gray-600">
                                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    High-quality Color
                                </li>
                                <li className="flex items-center text-gray-600">
                                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Premium Finish
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        Got questions? We've got answers! Here are some common questions about our printing service.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white p-6 rounded-xl border border-gray-100">
                            <h3 className="text-lg font-semibold mb-2">How long does it take to get my prints?</h3>
                            <p className="text-gray-600">Most orders are ready within 2-3 hours during business hours. Large orders may take longer.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-100">
                            <h3 className="text-lg font-semibold mb-2">What file formats do you accept?</h3>
                            <p className="text-gray-600">We accept PDF files for the best print quality and consistency.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-100">
                            <h3 className="text-lg font-semibold mb-2">Where can I collect my prints?</h3>
                            <p className="text-gray-600">You can collect your prints from our designated counter in the university library.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-100">
                            <h3 className="text-lg font-semibold mb-2">Do you offer bulk discounts?</h3>
                            <p className="text-gray-600">Yes! We offer special rates for large orders. Contact us for more details.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Our support team is here to help you with any questions or concerns.
                        </p>
                    </div>
                    <div className="flex justify-center space-x-8">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <h3 className="font-semibold mb-2">Email Us</h3>
                            <p className="text-gray-600">support@printx.com</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                            </div>
                            <h3 className="font-semibold mb-2">Call Us</h3>
                            <p className="text-gray-600">+880 1766-209481</p>
                        </div>
                    </div>
                </div>
            </section>
{/* Existing Footer */}
            <footer className="bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <img src="/logo.png" alt="PrintX" className="h-8 w-auto mx-auto mb-4" />
                    <p className="text-gray-600">© 2024 PrintX. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;