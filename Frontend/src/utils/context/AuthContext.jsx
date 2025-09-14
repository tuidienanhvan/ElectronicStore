import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';

// API configuration
const API_URL = '/api';
const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const toast = useToast();

    // Lưu user vào localStorage khi thay đổi
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    // Tạo headers với token nếu có
    const getAuthHeaders = () => ({
        ...DEFAULT_HEADERS,
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    });

    // Hàm xử lý response chung
    const handleResponse = async (response) => {
        const data = await response.json().catch(() => ({}));
        
        if (!response.ok) {
            throw new Error(data.message || `Request failed with status ${response.status}`);
        }
        
        return data;
    };

    // Kiểm tra token và lấy thông tin user khi khởi động
    useEffect(() => {
        const verifyToken = async () => {
            try {
                if (!token) {
                    setLoading(false);
                    return;
                }

                const response = await fetch(`${API_URL}/auth/me`, {
                    method: 'GET',
                    headers: getAuthHeaders(),
                    credentials: 'include'
                });

                const data = await handleResponse(response);
                setUser(data);
            } catch (error) {
                console.error('Auth verification error:', error);
                // Nếu token không hợp lệ, đăng xuất
                logout();
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [token]);

    // Đăng ký
    const register = async (userData) => {
        try {
            setLoading(true);
            console.log('Registering with data:', userData);

            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: DEFAULT_HEADERS,
                body: JSON.stringify(userData),
                credentials: 'include'
            });

            const data = await handleResponse(response);
            console.log('Registration successful:', data);

            toast('success', 'Đăng ký thành công! Vui lòng đăng nhập để tiếp tục.');
            
            // Chuyển đến trang đăng nhập sau 1.5 giây
            setTimeout(() => {
                navigate('/login');
            }, 1500);

        } catch (error) {
            console.error('Registration error:', error);
            toast('error', error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Đăng nhập
    const login = async (credentials) => {
        try {
            setLoading(true);
            console.log('Logging in with:', credentials.email);

            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: DEFAULT_HEADERS,
                body: JSON.stringify(credentials),
                credentials: 'include'
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Email hoặc mật khẩu không chính xác');
            }

            // Lưu token và thông tin user
            localStorage.setItem('token', data.token);
            setToken(data.token);
            setUser(data.user);
            
            toast('success', 'Đăng nhập thành công!');
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            throw new Error('Email hoặc mật khẩu không chính xác');
        } finally {
            setLoading(false);
        }
    };

    // Đăng xuất
    const logout = () => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setToken(null);
            setUser(null);
            toast('info', 'Đã đăng xuất thành công');
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
            toast('error', 'Có lỗi khi đăng xuất');
        }
    };

    // Kiểm tra đã đăng nhập chưa
    const isAuthenticated = () => {
        return !!token && !!user;
    };

    // Cập nhật thông tin user
    const updateUserInfo = async (updatedData) => {
        try {
            setLoading(true);
            console.log('Updating user info:', updatedData);

            const response = await fetch(`${API_URL}/auth/me`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(updatedData),
                credentials: 'include'
            });

            const data = await handleResponse(response);
            console.log('Update successful:', data);

            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            toast('success', 'Cập nhật thông tin thành công!');
        } catch (error) {
            console.error('Update error:', error);
            toast('error', error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Đồng bộ token từ localStorage khi khởi động
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken && !token) {
            setToken(savedToken);
        }
    }, []);

    // Context value
    const contextValue = {
        user,
        token,
        loading,
        register,
        login,
        logout,
        isAuthenticated,
        updateUserInfo
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {!loading && children}
        </AuthContext.Provider>
    );
};