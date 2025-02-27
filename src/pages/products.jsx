import React, { useState, useEffect } from 'react';
import Sidenav from '../components/sideNav';
import { Download, Printer, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getProducts, PlaceOrders } from '../api';
import { toast } from 'react-toastify';
import ConfirmationModal from '../components/ConfirmationModal';

const Products = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch products:', error);
            toast.error('Failed to load products');
            setLoading(false);
        }
    };

    const handlePrintClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleConfirmPrint = async () => {
        try {
            const formData = new FormData();
            formData.append('product_id', selectedProduct.id);
            formData.append('total_price', selectedProduct.price_per_page);
            formData.append('color', 'Color');
            formData.append('page_count', '0');

            const response = await PlaceOrders(formData);
            if (response.data) {
                toast.success('Order placed successfully!');
                navigate('/my-orders');
            }
        } catch (error) {
            console.error('Failed to place order:', error);
            toast.error(error.response?.data?.message || 'Failed to place order');
        } finally {
            setIsModalOpen(false);
            setSelectedProduct(null);
        }
    };

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-white flex">
            <Sidenav isNavOpen={isNavOpen} toggleNav={toggleNav} />
            
            <main className="flex-1 p-4 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Study Materials</h1>
                        <p className="text-gray-600 mt-1">Browse and print your favorite study materials.</p>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search forms..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Products Grid */}
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading products...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <div key={product.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-blue-500 transition-all">
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                                        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                            <span>{product.price_per_page} TK per page</span>
                                            <span>Created: {new Date(product.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <a
                                                href={`https://printx.geniieshop.com/${product.file_url}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                            >
                                                <Download size={18} />
                                                Download
                                            </a>
                                            <button
    onClick={() => handlePrintClick(product)}
    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
>
    <Printer size={18} />
    Print
</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <ConfirmationModal
                 type="success"
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedProduct(null);
                }}
                onConfirm={handleConfirmPrint}
                title="Place Print Order"
                message={
                    selectedProduct ? 
                    <div className="space-y-3">
                        <p>Are you sure you want to place a print order for:</p>
                        <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                            <p className="font-medium">{selectedProduct.title}</p>
                            <p className="text-sm text-gray-600">Price: {selectedProduct.price_per_page} TK per page</p>
                        </div>
                        <p className="text-sm text-gray-500">
                            After placing the order, you can view its status in My Orders.
                        </p>
                    </div> 
                    : ''
                }
            />
        </div>
    );
}

export default Products;