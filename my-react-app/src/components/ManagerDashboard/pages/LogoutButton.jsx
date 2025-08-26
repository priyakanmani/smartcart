// components/LogoutButton.jsx
import { clearManagerAuthData } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    clearManagerAuthData();
    navigate('/manager/login');
  };
  
  return (
    <button 
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;