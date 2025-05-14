import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCurrentUser } from '../utils/auth';

export default function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await fetchCurrentUser();
      if (user) {
        setAllowed(true);
      } else {
        navigate('/login');
      }
      setLoading(false);
    };
    checkAuth();
  }, [navigate]);

  if (loading) return null;

  return allowed ? children : null;
}
