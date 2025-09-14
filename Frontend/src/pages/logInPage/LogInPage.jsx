import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AuthContext } from '../../utils/context/AuthContext';
import { useToast } from '../../hooks/useToast';
import AuthCard from '../../components/auth/AuthCard';
import FormInput from '../../components/auth/FormInput';

const LogInPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');

  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  // Redirect nếu đã đăng nhập
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const newErrors = {};

    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Xóa lỗi khi user bắt đầu gõ
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    // Xóa thông báo lỗi đăng nhập khi user thay đổi input
    if (loginError) {
      setLoginError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setLoginError(''); // Reset login error
      await login(formData);
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Email hoặc mật khẩu không chính xác');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="Chào mừng trở lại!"
      subtitle="Đăng nhập để tiếp tục mua sắm"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {loginError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-md bg-red-50 border border-red-200"
          >
            <p className="text-sm text-red-600">{loginError}</p>
          </motion.div>
        )}

        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          disabled={isSubmitting}
          placeholder="example@email.com"
          icon={HiMail}
        />

        <FormInput
          label="Mật khẩu"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          disabled={isSubmitting}
          placeholder="••••••••"
          icon={RiLockPasswordLine}
        />

        <div>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={isSubmitting}
            className={`
              w-full flex justify-center py-2.5 px-4
              border border-transparent rounded-md
              shadow-sm text-sm font-medium text-white
              bg-gradient-to-r from-purple-600 to-indigo-600
              hover:from-purple-700 hover:to-indigo-700
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
            `}
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Đang đăng nhập...</span>
              </div>
            ) : (
              'Đăng nhập'
            )}
          </motion.button>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-gray-600">
              Ghi nhớ đăng nhập
            </label>
          </div>
          <div className="text-sm">
            <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
              Quên mật khẩu?
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Hoặc tiếp tục với</span>
          </div>
        </div>

        <div>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Chưa có tài khoản?{' '}
            <Link
              to="/registration"
              className="font-medium text-purple-600 hover:text-purple-500 transition-colors duration-200"
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </form>
    </AuthCard>
  );
};

export default LogInPage;