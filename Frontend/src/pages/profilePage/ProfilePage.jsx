import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/context/AuthContext';
import { useToast } from '../../hooks/useToast';
import { useRequireAuth } from '../../hooks/useRequireAuth';

const ProfilePage = () => {
  const user = useRequireAuth();
  const { updateUserInfo } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  if (!user) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await updateUserInfo(formData);
      setIsEditing(false);
      toast('success', 'Cập nhật thông tin thành công!');
    } catch (error) {
      toast('error', error.message || 'Có lỗi xảy ra khi cập nhật thông tin');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Thông tin tài khoản</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              {isEditing ? 'Hủy' : 'Chỉnh sửa'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Tên
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing || isSubmitting}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing || isSubmitting}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {isEditing && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Đang cập nhật...' : 'Lưu thay đổi'}
                </button>
              </div>
            )}
          </form>

          <div className="mt-8 border-t pt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Hoạt động gần đây</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Đơn hàng gần nhất</p>
                  <p className="text-sm text-gray-500">Chưa có đơn hàng nào</p>
                </div>
                <button
                  onClick={() => navigate('/dashboard/cart')}
                  className="text-sm text-purple-600 hover:text-purple-700"
                >
                  Xem giỏ hàng
                </button>
              </div>

              <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Sản phẩm yêu thích</p>
                  <p className="text-sm text-gray-500">Xem danh sách yêu thích của bạn</p>
                </div>
                <button
                  onClick={() => navigate('/dashboard/wishlist')}
                  className="text-sm text-purple-600 hover:text-purple-700"
                >
                  Xem danh sách
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 