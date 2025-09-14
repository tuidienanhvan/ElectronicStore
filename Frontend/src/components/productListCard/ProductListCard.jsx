import { AiOutlineDelete } from "react-icons/ai";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router";
import { useContext } from "react";
import { CartContext } from "../../utils/context/CartContext";
import { FavoriteContext } from "../../utils/context/FavouriteContext";
import { AuthContext } from "../../utils/context/AuthContext";
import { toast } from 'react-toastify';

const ProductListCard = ({ item }) => {
    const { handleRemoveCartItem, handleCartItem, updateQuantity } = useContext(CartContext);
    const { handleFavorite } = useContext(FavoriteContext);
    const { user } = useContext(AuthContext);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    // console.log(pathname);

    const { product_id, product_title, price, product_image, quantity = 1 } = item || {};

    const handleDelete = () => {
        if (pathname === "/dashboard/wishlist") {
            handleFavorite(item);
            toast.info('Đã xóa khỏi danh sách yêu thích');
        }
        else if (pathname === "/dashboard/cart") {
            handleRemoveCartItem(product_id);
            toast.info('Đã xóa khỏi giỏ hàng');
        }
    }

    const handleAddToCart = () => {
        if (!user) {
            toast.warn('Vui lòng đăng nhập để thêm vào giỏ hàng');
            navigate('/login');
            return;
        }
        handleCartItem(item);
        handleFavorite(item);
        toast.success('Đã thêm vào giỏ hàng');
    }

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity < 1) return;
        if (newQuantity > 99) {
            toast.warn('Số lượng tối đa là 99');
            return;
        }
        updateQuantity(product_id, newQuantity);
    }

    return (
        <div className="w-full h-full bg-white p-4 rounded-xl flex justify-between items-center gap-4 shadow-md">
            <div className="aspect-[4/3] w-32 rounded-lg">
                <img src={product_image} alt={product_title} className="w-full aspect-[4/3] rounded-lg " />
            </div>

            <div className="w-full h-full md:flex justify-between items-start gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl font-semibold">{product_title}</h1>
                    <div className="flex items-center gap-2">
                        <p className="text-lg">${price}</p>
                        {pathname === "/dashboard/cart" && (
                            <p className="text-sm text-gray-500">
                                Tổng: ${(price * quantity).toFixed(2)}
                            </p>
                        )}
                    </div>
                </div>

                <div className="my-auto flex flex-col md:flex-row justify-end items-center gap-4">
                    {pathname === "/dashboard/cart" && (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleQuantityChange(quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-purple-600 border border-gray-300 rounded-full hover:border-purple-600 transition-colors"
                            >
                                <HiMinusSm className="text-lg" />
                            </button>
                            <input
                                type="number"
                                min="1"
                                max="99"
                                value={quantity}
                                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                                className="w-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <button
                                onClick={() => handleQuantityChange(quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-purple-600 border border-gray-300 rounded-full hover:border-purple-600 transition-colors"
                            >
                                <HiPlusSm className="text-lg" />
                            </button>
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        {pathname === "/dashboard/wishlist" && (
                            <button
                                onClick={handleAddToCart}
                                className="px-4 py-[5px] text-white text-lg font-medium bg-[#9538E2] border border-white rounded-full hover:bg-[#6b1eab]"
                            >
                                Add to Cart
                            </button>
                        )}

                        <button
                            onClick={handleDelete}
                            className="text-[1.6rem] cursor-pointer transition-all duration-500 hover:text-red-700"
                        >
                            <AiOutlineDelete />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListCard;