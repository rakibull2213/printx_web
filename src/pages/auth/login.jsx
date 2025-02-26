import { useState, useEffect } from "react";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa';
import { login } from "../../api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
    const [password, setPassword] = useState("");
    const [terms, setTerms] = useState(false);
    const [studentID, setStudentID] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await login(studentID, password);
            Cookies.set('token', res.data.access_token, { expires: 7 });
            Cookies.set('user', JSON.stringify(res.data.customer), { expires: 7 });
            toast.success('Login successful!');
            navigate('/dashboard');
        } catch (err) {
            toast.error("Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex">
            <ToastContainer />
            {/* Left Section with Form */}
            <div className="w-full md:w-[480px] p-8 flex flex-col justify-center">
                <div className="w-full max-w-md mx-auto">
                    <div className="mb-8">
                        <div className="flex items-center mb-8">
                            <img src="/logo.png" alt="PrintX" className="h-8 w-auto mr-2" />
                            <span className="text-xl font-bold">PrintX</span>
                        </div>
                        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                            Log in to your Account
                        </h1>
                        <p className="text-center text-gray-600">
                            Don't have an account? {' '}
                            <a href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                                Sign up
                            </a>
                        </p>
                    </div>
                    <div className="space-y-4 mb-8">
                        <button className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                            <FaGoogle className="mr-3 text-[#EA4335]" />
                            <span className="text-sm font-medium">Google</span>
                        </button>
                        <button className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                            <FaFacebook className="mr-3 text-[#1877F2]" />
                            <span className="text-sm font-medium">Facebook</span>
                        </button>
                    </div>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">or</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="number"
                                placeholder="Student ID"
                                value={studentID}
                                onChange={(e) => setStudentID(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                            </button>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={terms}
                                onChange={(e) => setTerms(e.target.checked)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                required
                            />
                            <label className="ml-2 text-sm text-gray-600">
                                I agree to the Terms & Conditions
                            </label>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Right Section with Illustration */}
            <div className="hidden md:flex flex-1 items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/vector-1739202818839-8f1a28fb4ce7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Dashboard illustration"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-blue-600/90 mix-blend-multiply"></div>
                </div>
                <div className="relative z-10 max-w-md text-white">
                    <div className="mb-8">
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                        </div>
                        <h2 className="text-2xl font-semibold mb-4">Print Your Documents Faster</h2>
                        <p className="text-white/80"> PrintX is a printing service that allows you to print your documents faster and easier. </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;