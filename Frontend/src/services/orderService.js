import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders';

export const orderService = {
  createOrder: async (orderData, token) => {
    try {
      const response = await axios.post(API_URL, orderData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Lỗi khi tạo đơn hàng' };
    }
  }
}; 