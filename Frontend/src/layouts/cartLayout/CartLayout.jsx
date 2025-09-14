// layouts/cartLayout/CartLayout.jsx
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../utils/context/CartContext';
import ProductListCard from '../../components/productListCard/ProductListCard';
import Modal from '../../components/modal/Modal';
import { AuthContext } from '../../utils/context/AuthContext';
import { orderService } from '../../services/orderService';

const CartLayout = () => {
  const { cartItems, handleRemoveCartItem, handleClearCart } = useContext(CartContext);
  const { user, token, loading, setToken } = useContext(AuthContext);
  const [sortedItems, setSortedItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [paid, setPaid] = useState(0);

  console.log('CartItems in CartLayout:', cartItems); // Debug cartItems
  console.log('User:', user);
  console.log('Token:', token);

  useEffect(() => {
    setSortedItems(Array.isArray(cartItems) ? cartItems : []);
  }, [cartItems]);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken && !token) {
      setToken(savedToken);
    }
  }, []);

  const totalPrice = sortedItems.reduce((total, item) => {
    const itemPrice = item.price || 0;
    const quantity = item.quantity || 1;
    return total + (itemPrice * quantity);
  }, 0);

  const handleSort = () => {
    const sorted = [...sortedItems].sort((a, b) => {
      const aTotal = (a.price || 0) * (a.quantity || 1);
      const bTotal = (b.price || 0) * (b.quantity || 1);
      return bTotal - aTotal;
    });
    setSortedItems(sorted);
  };

  const handlePurchase = async () => {
    if (loading) return; // Đợi context load xong
    if (!user || !token) {
      alert('Bạn cần đăng nhập để mua hàng!');
      return;
    }
    try {
      const orderData = {
        items: sortedItems.map(item => ({
          product_id: item.product_id,
          product_title: item.product_title,
          product_image: item.product_image,
          price: item.price,
          quantity: item.quantity || 1
        })),
        total: totalPrice,
        shippingInfo: {} // Có thể bổ sung lấy từ form nếu muốn
      };
      await orderService.createOrder(orderData, token);
      setPaid(totalPrice);
      setIsModalVisible(true);
      handleClearCart();
    } catch (err) {
      alert(err.message || 'Lỗi khi tạo đơn hàng!');
    }
  };

  return (
    <div className="sectionBase mx-auto">
      <div className="w-full p-2 md:flex md:gap-4 justify-center items-center">
        <div className="w-full mt-2 md:mt-0 grow flex justify-between items-end md:items-center gap-4">
          <h1 className="text-2xl font-bold">Giỏ hàng của tôi</h1>
          <p className="text-2xl font-bold">Tổng: ${totalPrice.toFixed(2)}</p>
        </div>

        <div className="w-full md:w-fit mt-2 md:mt-0 flex justify-between md:flex-none items-center gap-4">
          <button
            onClick={handleSort}
            className="px-4 py-1 text-[#7f21c7] text-lg font-semibold bg-white border border-[#6b1eab] rounded-full hover:bg-[#6b1eab] hover:text-white hover:border-white transition duration-300"
          >
            Sắp xếp theo giá
          </button>
          <button
            onClick={handlePurchase}
            disabled={sortedItems.length === 0}
            className={`px-4 py-[5px] text-white text-lg font-medium bg-[#9538E2] border rounded-full border-white ${
              sortedItems.length === 0 ? 'cursor-not-allowed opacity-50' : 'hover:bg-[#6b1eab]'
            }`}
          >
            Mua ngay
          </button>
        </div>
      </div>
      <div className="w-full mt-4 md:mt-6 flex flex-col gap-4">
        {sortedItems.length > 0 ? (
          sortedItems.map((item) => <ProductListCard key={item.product_id} item={item} />)
        ) : (
          <div className="w-full flex justify-center items-center h-[360px]">
            <p className="text-lg">Giỏ hàng trống</p>
          </div>
        )}
      </div>

      {isModalVisible && <Modal total={paid} />}
    </div>
  );
};

export default CartLayout;