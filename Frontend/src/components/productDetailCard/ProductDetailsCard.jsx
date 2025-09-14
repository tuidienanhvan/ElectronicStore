// components/ProductDetailsCard.jsx
import { useContext, useState, useEffect } from 'react';
import { IoHeart, IoHeartOutline, IoStar } from 'react-icons/io5';
import { useParams, useNavigate } from 'react-router-dom';
import { FavoriteContext } from '../../utils/context/FavouriteContext';
import { CartContext } from '../../utils/context/CartContext';
import { useToast } from '../../hooks/useToast';
import { AuthContext } from '../../utils/context/AuthContext';
import { productService } from '../../services/productService';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

const ProductDetailsCard = () => {
  const { favorites, handleFavorite } = useContext(FavoriteContext);
  const { handleCartItem } = useContext(CartContext);
  const { id } = useParams();
  const toast = useToast();
  const user = useContext(AuthContext).user;
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        if (!data) {
          throw new Error('Không tìm thấy thông tin sản phẩm');
        }
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.response?.data?.message || err.message || 'Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const [isFavorite, setIsFavorite] = useState(
    Array.isArray(favorites) && product ? favorites.some(item => item.product_id === product.product_id) : false
  );

  useEffect(() => {
    setIsFavorite(
      Array.isArray(favorites) && product ? favorites.some(item => item.product_id === product.product_id) : false
    );
  }, [favorites, product]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 py-8">
        <div className="sectionBase mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 text-center">
              <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                {error || 'Sản phẩm không tồn tại'}
              </h1>
              <button
                onClick={() => navigate('/products')}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Quay lại trang sản phẩm
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleFavoriteClick = () => {
    if (!product) {
      toast('warn', 'Không thể thêm sản phẩm vào danh sách yêu thích.');
      return;
    }
    setIsFavorite(!isFavorite);
    handleFavorite(product);
    toast(isFavorite ? 'warn' : 'success', isFavorite ? 'Đã xóa khỏi danh sách yêu thích' : 'Đã thêm vào danh sách yêu thích');
  };

  const handleAddToCart = () => {
    if (!user) {
      toast('warn', 'Vui lòng đăng nhập để thêm vào giỏ hàng');
      navigate('/login');
      return;
    }
    if (!product) {
      toast('warn', 'Không thể thêm sản phẩm vào giỏ hàng.');
      return;
    }
    handleCartItem(product);
    toast('success', 'Đã thêm vào giỏ hàng');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 py-8">
      <div className="sectionBase mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden hover:shadow-3xl transition-all duration-500">
            <div className="lg:flex">
              <div className="lg:w-1/2 p-6 lg:p-8">
                <div className="relative group">
                  <div className="aspect-[4/3] relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-xl">
                    <img
                      src={product.image || product.product_image || '/placeholder-image.jpg'}
                      alt={product.name || product.product_title || 'Product Image'}
                      className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder-image.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-4 leading-tight">
                      {product.name || product.product_title || 'Tên sản phẩm không có sẵn'}
                    </h1>
                    
                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                        ${product.price}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-2xl border border-gray-100 space-y-2">
                    <p className="text-gray-700 leading-relaxed text-lg mb-2">{product.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600 text-base">
                      <div><span className="font-semibold">Mã sản phẩm:</span> {product.product_id}</div>
                      <div><span className="font-semibold">Loại:</span> {product.category}</div>
                      <div><span className="font-semibold">Đánh giá:</span> {product.rating} <IoStar className="inline text-yellow-400 mb-1" /></div>
                      <div><span className="font-semibold">Đã bán:</span> {product.sold}</div>
                      <div><span className="font-semibold">Trạng thái:</span> {product.availability ? 'Còn hàng' : 'Hết hàng'}</div>
                      {product.createdAt && <div><span className="font-semibold">Ngày tạo:</span> {new Date(product.createdAt).toLocaleString()}</div>}
                      {product.updatedAt && <div><span className="font-semibold">Cập nhật:</span> {new Date(product.updatedAt).toLocaleString()}</div>}
                    </div>
                  </div>

                  {(product.specifications || product.Specification) && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-gradient-to-b from-purple-600 to-blue-600 rounded-full"></div>
                        Thông số kỹ thuật
                      </h2>
                      <div className="space-y-3">
                        {(product.specifications || product.Specification).map((spec, index) => (
                          <div 
                            key={index} 
                            className="flex items-center gap-4 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/90 hover:shadow-md transition-all duration-300 group"
                          >
                            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                            <span className="text-gray-700 font-medium">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 mt-8">
                    <button
                      className="flex-1 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300"
                      onClick={handleAddToCart}
                    >
                      Thêm vào giỏ hàng
                    </button>

                    <button
                      className="bg-white/90 backdrop-blur-sm rounded-2xl w-16 h-16 flex items-center justify-center text-gray-600 border-2 border-gray-200 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/20 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 group"
                      onClick={handleFavoriteClick}
                    >
                      {isFavorite ? (
                        <IoHeart className="w-7 h-7 text-red-500 group-hover:scale-125 transition-transform duration-300" />
                      ) : (
                        <IoHeartOutline className="w-7 h-7 group-hover:text-red-500 group-hover:scale-125 transition-all duration-300" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;