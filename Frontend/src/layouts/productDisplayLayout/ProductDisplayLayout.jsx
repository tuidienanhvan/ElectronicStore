import React, { useState, useEffect } from 'react';
import { Menu, X, Smartphone, Laptop, Headphones, Watch, Camera, Gamepad2, ChevronDown, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../../services/productService';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';

const Button2 = ({ text, cls, clickAction, selected }) => (
  <button
    className={`${cls} px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
      selected
        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl'
        : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-purple-600 shadow-md'
    }`}
    onClick={clickAction}
  >
    {text}
  </button>
);

const Products = ({ cat }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categoryObjects = [
    { id: 0, name: 'All', value: 'all', icon: Menu },
    { id: 1, name: 'Smartphones', value: 'smartphone', icon: Smartphone },
    { id: 2, name: 'Laptops', value: 'laptop', icon: Laptop },
    { id: 3, name: 'Headphones', value: 'headphone', icon: Headphones },
    { id: 4, name: 'Smartwatches', value: 'smartwatch', icon: Watch },
    { id: 5, name: 'Cameras', value: 'camera', icon: Camera },
    { id: 6, name: 'Gaming', value: 'gaming', icon: Gamepad2 },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        let data;
        if (cat === 'All') {
          data = await productService.getAllProducts();
        } else {
          const categoryObj = categoryObjects.find(c => c.name === cat);
          if (!categoryObj) {
            throw new Error('Category không hợp lệ');
          }
          data = await productService.getProductsByCategory(categoryObj.value);
        }
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Không thể tải sản phẩm. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [cat]);

  const handleViewDetails = (productId) => {
    navigate(`/products/${productId}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-4xl">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.product_id}
            className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-white/20"
          >
            <div className="h-48 mb-4 overflow-hidden rounded-lg">
              <img 
                src={product.product_image} 
                alt={product.product_title}
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{product.product_title}</h3>
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold text-purple-600">${product.price}</span>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">⭐</span>
                <span className="text-gray-600">{product.rating}</span>
              </div>
            </div>
            <button 
              onClick={() => handleViewDetails(product.product_id)}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg flex items-center justify-center gap-2"
            >
              <Eye size={20} />
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function GadgetExplorer() {
  const [category, setCategory] = useState('All');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const categoryObjects = [
    { id: 0, name: 'All', value: 'all', icon: Menu },
    { id: 1, name: 'Smartphones', value: 'smartphone', icon: Smartphone },
    { id: 2, name: 'Laptops', value: 'laptop', icon: Laptop },
    { id: 3, name: 'Headphones', value: 'headphone', icon: Headphones },
    { id: 4, name: 'Smartwatches', value: 'smartwatch', icon: Watch },
    { id: 5, name: 'Cameras', value: 'camera', icon: Camera },
    { id: 6, name: 'Gaming', value: 'gaming', icon: Gamepad2 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-300/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-blue-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-indigo-300/20 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10">
        <div id='displaysection' className="sectionBase w-full py-20 px-4 mx-auto max-w-7xl">
          {/* Enhanced header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Explore Cutting-Edge Gadgets
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the latest technology and premium devices that define the future
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="relative flex flex-col lg:flex-row gap-8 items-start">
            {/* Mobile menu button */}
            <button
              className="lg:hidden flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              {isCategoryOpen ? <X size={20} /> : <Menu size={20} />}
              <span className="font-semibold">Categories</span>
              <ChevronDown className={`transform transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} size={16} />
            </button>

            {/* Desktop sidebar */}
            <div className="hidden lg:block w-64 sticky top-8">
              <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/20">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  Categories
                </h3>
                <div className="space-y-3">
                  {categoryObjects.map((ctg) => {
                    const IconComponent = ctg.icon;
                    return (
                      <button
                        key={ctg.id}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                          category === ctg.name
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl'
                            : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-purple-600 shadow-md hover:shadow-lg'
                        }`}
                        onClick={() => setCategory(ctg.name)}
                      >
                        <IconComponent size={20} />
                        <span className="font-semibold">{ctg.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile sidebar */}
            <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${
              isCategoryOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}>
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsCategoryOpen(false)}></div>
              <div className={`absolute top-0 left-0 w-80 h-full bg-white/95 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 ${
                isCategoryOpen ? 'translate-x-0' : '-translate-x-full'
              }`}>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-gray-800">Categories</h3>
                    <button
                      onClick={() => setIsCategoryOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {categoryObjects.map((ctg) => {
                      const IconComponent = ctg.icon;
                      return (
                        <button
                          key={ctg.id}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                            category === ctg.name
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl'
                              : 'bg-gray-50 text-gray-700 hover:bg-white hover:text-purple-600 shadow-md hover:shadow-lg'
                          }`}
                          onClick={() => {
                            setCategory(ctg.name);
                            setIsCategoryOpen(false);
                          }}
                        >
                          <IconComponent size={20} />
                          <span className="font-semibold">{ctg.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Products section */}
            <Products cat={category} />
          </div>
        </div>
      </div>
    </div>
  );
}