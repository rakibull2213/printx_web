import { useState } from "react";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa';
import { register } from "../../api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        student_id: "",
        password: "",
        password_confirmation: "",
        phone: ""
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.password_confirmation) {
            toast.error("Passwords do not match!");
            return;
        }
        setLoading(true);
        try {
            await register(formData);
            toast.success('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            // Handle validation errors
            if (err.response?.data?.student_id) {
                toast.error(err.response.data.student_id[0]);
            } else if (err.response?.data?.email) {
                toast.error(err.response.data.email[0]);
            } else if (err.response?.data?.phone) {
                toast.error(err.response.data.phone[0]);
            } else {
                toast.error("Registration failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                            Create your Account
                        </h1>
                        <p className="text-center text-gray-600">
                            Already have an account? {' '}
                            <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                                Log in
                            </a>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                name="student_id"
                                placeholder="Student ID"
                                value={formData.student_id}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
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
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="password_confirmation"
                                placeholder="Confirm Password"
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                            </button>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Right Section with Illustration - Same as login page */}
            <div className="hidden md:flex flex-1 items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/vector-1739202818403-92046cd14712?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                        <h2 className="text-2xl font-semibold mb-4">Join PrintX Today</h2>
                        <p className="text-white/80">Create your account and start printing your documents faster and easier.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;