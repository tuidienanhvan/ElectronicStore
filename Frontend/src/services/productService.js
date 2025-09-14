import axios from 'axios';


const API_URL = 'http://localhost:5000/api'; // Cập nhật port cho đúng với server MongoDB của bạn

const useLocalData = false; // Set to false when your API is ready

// Add request interceptor to handle errors globally
axios.interceptors.request.use(
    config => {
        // You can add auth headers here if needed
        return config;
    },
    error => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor to handle errors globally
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response Error:', error.response.data);
            console.error('Status Code:', error.response.status);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No Response Received:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Request Setup Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export const productService = {
    // Lấy tất cả sản phẩm
    getAllProducts: async () => {
        if (useLocalData) {
            return productData.products;
        }

        try {
            const response = await axios.get(`${API_URL}/products`);
            console.log('Products fetched:', response.data); // Debug log
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    // Lấy sản phẩm theo ID
    getProductById: async (product_id) => {
        if (!product_id) {
            throw new Error('ID sản phẩm không hợp lệ');
        }

        if (useLocalData) {
            const product = productData.products.find(p => p.product_id === product_id);
            if (!product) {
                throw new Error('Không tìm thấy sản phẩm');
            }
            return product;
        }

        try {
            const response = await axios.get(`${API_URL}/products/${product_id}`);
            if (!response.data) {
                throw new Error('Không tìm thấy thông tin sản phẩm');
            }
            console.log('Product fetched:', response.data); // Debug log
            return response.data;
        } catch (error) {
            console.error('Error fetching product:', error);
            if (error.response) {
                throw new Error(error.response.data.message || 'Lỗi khi lấy thông tin sản phẩm');
            } else if (error.request) {
                throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng');
            } else {
                throw new Error('Có lỗi xảy ra khi gửi yêu cầu');
            }
        }
    },

    // Lấy sản phẩm theo category
    getProductsByCategory: async (category) => {
        if (useLocalData) {
            if (!category || category === 'all') {
                return productData.products;
            }
            const products = productData.products.filter(p => p.category === category);
            if (products.length === 0) {
                console.log('No products found for category:', category);
            }
            return products;
        }

        try {
            if (!category || category === 'all') {
                return productService.getAllProducts();
            }
            
            const response = await axios.get(`${API_URL}/products/category/${category}`);
            console.log('Products by category fetched:', response.data); // Debug log
            
            if (!response.data || response.data.length === 0) {
                console.log('No products found for category:', category);
            }
            
            return response.data;
        } catch (error) {
            console.error('Error fetching products by category:', error);
            if (error.response && error.response.status === 404) {
                return []; // Trả về mảng rỗng nếu không tìm thấy sản phẩm
            }
            throw error;
        }
    }
}; 