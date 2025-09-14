import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiMail, HiUser } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AuthContext } from '../../utils/context/AuthContext';
import { useToast } from '../../hooks/useToast';
import AuthCard from '../../components/auth/AuthCard';
import FormInput from '../../components/auth/FormInput';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { register, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  // Redirect nếu đã đăng nhập
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Kiểm tra độ mạnh của mật khẩu
  useEffect(() => {
    const password = formData.password;
    let strength = 0;

    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    setPasswordStrength(strength);
  }, [formData.password]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Tên là bắt buộc';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Tên phải có ít nhất 2 ký tự';
    }

    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Xác nhận mật khẩu là bắt buộc';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
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
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
    } catch (error) {
      toast('error', error.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return 'bg-red-500';
      case 2:
      case 3:
        return 'bg-yellow-500';
      case 4:
      case 5:
        return 'bg-green-500';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <AuthCard
      title="Tạo tài khoản mới"
      subtitle="Đăng ký để bắt đầu mua sắm"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Tên"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          disabled={isSubmitting}
          placeholder="Nhập tên của bạn"
          icon={HiUser}
        />

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

        <div className="space-y-2">
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
          {formData.password && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-1"
            >
              <div className="flex gap-1 h-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <motion.div
                    key={level}
                    className={`flex-1 rounded-full ${level <= passwordStrength ? getPasswordStrengthColor() : 'bg-gray-200'}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.2, delay: level * 0.1 }}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500">
                {passwordStrength <= 1 && 'Mật khẩu yếu'}
                {passwordStrength > 1 && passwordStrength <= 3 && 'Mật khẩu trung bình'}
                {passwordStrength > 3 && 'Mật khẩu mạnh'}
              </p>
            </motion.div>
          )}
        </div>

        <FormInput
          label="Xác nhận mật khẩu"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
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
                <span>Đang đăng ký...</span>
              </div>
            ) : (
              'Đăng ký'
            )}
          </motion.button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Hoặc tiếp tục với</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </motion.button>

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
            Đã có tài khoản?{' '}
            <Link
              to="/login"
              className="font-medium text-purple-600 hover:text-purple-500 transition-colors duration-200"
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </form>
    </AuthCard>
  );
};

export default RegistrationPage;