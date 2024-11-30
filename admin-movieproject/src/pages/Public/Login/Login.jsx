import { useState, useRef, useCallback, useEffect, useContext } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../utils/hooks/useDebounce';
import axios from 'axios';
import { AuthContext } from '../../../utils/context/AuthToken'; // Assuming you have AuthContext here

function Login() {
  const { setAuthData } = useContext(AuthContext); // Accessing the setAuthData function from the AuthContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFieldsDirty, setIsFieldsDirty] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const userInputDebounce = useDebounce({ email, password }, 2000);
  const [debounceState, setDebounceState] = useState(false);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState(''); // For displaying error messages
  const navigate = useNavigate();

  const handleShowPassword = useCallback(() => {
    setIsShowPassword((value) => !value);
  }, [isShowPassword]);

  const handleOnChange = (event, type) => {
    setDebounceState(false);
    setIsFieldsDirty(true);

    switch (type) {
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  // Determine API endpoint dynamically
  const getApiEndpoint = () => {
    if (window.location.pathname.includes('/admin')) {
      return '/admin/login';
    }
    return '/user/login';
  };

  // Handle the login process
  const handleLogin = async () => {
    const data = { email, password };
    setStatus('loading');
    setErrorMessage(''); // Clear previous error message

    try {
      const apiEndpoint = getApiEndpoint(); // Determine the API endpoint based on the current path
      const res = await axios.post(apiEndpoint, data, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      });

      console.log(res);

      // Check if the user is admin
      if (res.data.user.role !== 'admin') {
        setStatus('idle');
        setErrorMessage('Only admin users can log in.');
        return; // Prevent further actions for non-admin users
      }

      // Store authentication token and user data
      localStorage.setItem('accessToken', res.data.access_token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // Set the auth data in context
      setAuthData({
        accessToken: res.data.access_token,
        user: res.data.user,
      });

      setStatus('idle');
      navigate('/main/movies'); // Redirect to admin dashboard
    } catch (e) {
      console.log(e);
      setStatus('idle');
      setErrorMessage(e.response?.data?.message || 'Login failed');
    }
  };

  useEffect(() => {
    setDebounceState(true);
  }, [userInputDebounce]);

  return (
    <div className='Login'>
      <div className='main-container'>
        <h3>Login</h3>
        <form>
          <div className='form-container'>
            <div>
              <div className='form-group'>
                <label>E-mail:</label>
                <input
                  type='text'
                  name='email'
                  ref={emailRef}
                  onChange={(e) => handleOnChange(e, 'email')}
                />
              </div>
              {debounceState && isFieldsDirty && email === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div>
              <div className='form-group'>
                <label>Password:</label>
                <input
                  type={isShowPassword ? 'text' : 'password'}
                  name='password'
                  ref={passwordRef}
                  onChange={(e) => handleOnChange(e, 'password')}
                />
              </div>
              {debounceState && isFieldsDirty && password === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div className='show-password' onClick={handleShowPassword}>
              {isShowPassword ? 'Hide' : 'Show'} Password
            </div>

            {errorMessage && (
              <div className='error-message'>
                <span>{errorMessage}</span>
              </div>
            )}

            <div className='submit-container'>
              <button
                type='button'
                disabled={status === 'loading'}
                onClick={() => {
                  if (status === 'loading') {
                    return;
                  }
                  if (email && password) {
                    handleLogin(); // Call handleLogin on button click
                  } else {
                    setIsFieldsDirty(true);
                    if (email === '') {
                      emailRef.current.focus();
                    }

                    if (password === '') {
                      passwordRef.current.focus();
                    }
                  }
                }}
              >
                {status === 'idle' ? 'Login' : 'Loading...'}
              </button>
            </div>
            <div className='register-container'>
              <a href='/register'>
                <small>Register</small>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
