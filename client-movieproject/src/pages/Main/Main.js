import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?'); 
    if (confirmLogout) {
      setTimeout(() => {
        localStorage.removeItem('accessToken');
        navigate('/login'); 
      }, 3000); 
    }
  };

  useEffect(() => {
    if (!accessToken) { 
      navigate('/login'); 
    }
  }, [accessToken, navigate]); 

  return (
    <div className='Main'>
      <div className='container'>
        <div className='navigation'>
          <ul>
          <li>
              <a onClick={() => navigate('/landing')}>Home</a>
            </li>
            <li>
              <a onClick={() => navigate('/home')}>Movies</a>
            </li>
            {accessToken ? (
              <li className='logout'>
                <a onClick={handleLogout}>Log Out</a>
              </li>
            ) : (
              <li className='login'>
                <a onClick={() => navigate('/login')}>Login</a>
              </li>
            )}
          </ul>
        </div>
        <div className='outlet'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;