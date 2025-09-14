// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './utils/context/CartContext';
import { FavoriteProvider } from './utils/context/FavouriteContext';
import { AuthProvider } from './utils/context/AuthContext';

import HomeLayout from './layouts/homeLayout/HomeLayout';
import ProductDisplayLayout from './layouts/productDisplayLayout/ProductDisplayLayout';
import StatisticsLayout from './layouts/statisticsLayout/StatisticsLayout';
import CartLayout from './layouts/cartLayout/CartLayout';
import FavouriteLayout from './layouts/favouriteLayout/FavouriteLayout';
import DashboardLayout from './layouts/dashboardLayout/DashboardLayout';
import ProductDetailsLayout from './layouts/productDetailsLayout/ProductDetailsLayout';
import LogInPage from './pages/logInPage/LogInPage';
import RegistrationPage from './pages/registrationPage/RegistrationPage';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import ProfilePage from './pages/profilePage/ProfilePage';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoriteProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomeLayout />} />
            <Route path="/products" element={<ProductDisplayLayout />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/statistics" element={<StatisticsLayout />} />
            <Route path="/products/:id" element={<ProductDetailsLayout />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="cart" element={<CartLayout />} />
              <Route path="wishlist" element={<FavouriteLayout />} />
            </Route>
          </Routes>
          <Footer />
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            limit={4}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={Bounce}
          />
        </FavoriteProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;