import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/context/AuthContext';
import { useToast } from './useToast';

export const useRequireAuth = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!user) {
      toast('warn', 'Vui lòng đăng nhập để tiếp tục');
      navigate('/login');
    }
  }, [user, navigate, toast]);

  return user;
}; 