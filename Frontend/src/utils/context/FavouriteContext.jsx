// utils/context/FavouriteContext.jsx
import { createContext, useState, useEffect } from 'react';

export const FavoriteContext = createContext({
  favorites: [],
  handleFavorite: () => {},
});

export const FavoriteProvider = ({ children }) => {
  // Khởi tạo favorites từ localStorage hoặc mảng rỗng
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Lưu favorites vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleFavorite = (item) => {
    if (!item || !item.product_id) {
      console.warn('Không thể thêm sản phẩm: item hoặc product_id không hợp lệ', item);
      return;
1823
    }
    setFavorites((prev) => {
      if (prev.some(favItem => favItem.product_id === item.product_id)) {
        return prev.filter(favItem => favItem.product_id !== item.product_id);
      }
      return [...prev, item];
    });
  };

  return (
    <FavoriteContext.Provider value={{ favorites, handleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};