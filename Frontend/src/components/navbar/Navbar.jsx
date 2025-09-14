import { useContext, useState, useRef, useEffect } from 'react';
import { IoIosCart, IoIosHeart, IoIosSearch } from 'react-icons/io';
import { CiMenuFries } from 'react-icons/ci';
import { NavLink } from 'react-router-dom';
import { FavoriteContext } from '../../utils/context/FavouriteContext';
import { AuthContext } from '../../utils/context/AuthContext';
import { CartContext } from '../../utils/context/CartContext';

const Navbar = () => {
  const { favorites } = useContext(FavoriteContext);
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const navlinks = [
    { name: 'Statistics', path: '/statistics' },
    { name: 'Dashboard', path: '/dashboard/cart' },
  ];

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Gadget Haven
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium transition-all duration-200 hover:text-purple-600 ${
                  isActive ? 'text-purple-600' : 'text-gray-700'
                }`
              }
            >
              Home
            </NavLink>
            {navlinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all duration-200 hover:text-purple-600 ${
                    isActive ? 'text-purple-600' : 'text-gray-700'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            {/* Search Bar */}
            <div className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:bg-white border-2 border-transparent focus:border-purple-600 transition-all duration-200 outline-none text-sm"
                />
                <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              </div>
            </div>

            {/* Cart Icon */}
            <NavLink to="/dashboard/cart" className="relative group">
              <IoIosCart className="text-2xl text-gray-700 group-hover:text-purple-600 transition-colors duration-200" />
              {Array.isArray(cartItems) && cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </NavLink>

            {/* Favorites Icon */}
            <NavLink to="/dashboard/wishlist" className="relative group">
              <IoIosHeart className="text-2xl text-gray-700 group-hover:text-purple-600 transition-colors duration-200" />
              {Array.isArray(favorites) && favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </NavLink>

            {/* Profile Section */}
            {user ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 group"
                >
                  
                  <span className="hidden md:block text-sm font-medium text-gray-700 group-hover:text-purple-600">
                    {user.name}
                  </span>
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-xl border border-gray-100 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50">
                      <p className="text-sm font-medium text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                    </div>
                    <div className="py-2">
                      <NavLink
                        to="/profile"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                      >
                        Thông tin tài khoản
                      </NavLink>
                      <NavLink
                        to="/dashboard/cart"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                      >
                        Giỏ hàng của tôi
                      </NavLink>
                      <NavLink
                        to="/dashboard/wishlist"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                      >
                        Danh sách yêu thích
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/login"
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                Đăng nhập
              </NavLink>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-purple-600 transition-colors duration-200"
            >
              <CiMenuFries className="text-2xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:bg-white border-2 border-transparent focus:border-purple-600 transition-all duration-200 outline-none text-sm"
                />
                <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              </div>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-50 text-purple-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              {navlinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-purple-50 text-purple-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;