// utils/context/CartContext.jsx
import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext({
  cartItems: [],
  handleCartItem: () => {},
  handleRemoveCartItem: () => {},
  handleClearCart: () => {},
  updateQuantity: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleCartItem = (item) => {
    if (!item || !item.product_id) {
      console.warn('Không thể thêm sản phẩm: item hoặc product_id không hợp lệ', item);
      return;
    }
    setCartItems((prev) => {
      const existingItem = prev.find(cartItem => cartItem.product_id === item.product_id);
      if (existingItem) {
        // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên 1
        return prev.map(cartItem => 
          cartItem.product_id === item.product_id 
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem
        );
      }
      // Nếu là sản phẩm mới, thêm vào với số lượng là 1
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleRemoveCartItem = (productId) => {
    setCartItems(cartItems.filter(item => item.product_id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1 || newQuantity > 99) {
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.product_id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      handleCartItem, 
      handleRemoveCartItem, 
      handleClearCart,
      updateQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
};