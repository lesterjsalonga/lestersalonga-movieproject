import { useState, useRef, useCallback, useEffect, useContext } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../utils/hooks/useDebounce';
import axios from 'axios';
import { AuthContext } from '../../../utils/context/AuthToken'; 

function Login() {
  const { setAuthData } = useContext(AuthContext); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFieldsDirty, setIsFieldsDirty] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const userInputDebounce = useDebounce({ email, password }, 2000);
  const [debounceState, setDebounceState] = useState(false);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState('');
  const words = ['Movie', 'Series', 'TV Show', 'Anime'];
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[wordIndex];
      setTypedText(prev => 
        isDeleting 
          ? prev.slice(0, -1) 
          : currentWord.slice(0, prev.length + 1)
      );

      if (!isDeleting && typedText === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      }

      if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    const typingSpeed = isDeleting ? 50 : 100;
    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, wordIndex]);


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

  const getApiEndpoint = () => {
    if (window.location.pathname.includes('/admin')) {
      return '/admin/login';
    }
    return '/user/login';
  };

  const handleLogin = async () => {
    const data = { email, password };
    setStatus('loading');
    setErrorMessage(''); 

    try {
      const apiEndpoint = getApiEndpoint(); 
      const res = await axios.post(apiEndpoint, data, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      });

      console.log(res);

      if (res.data.user.role !== 'admin') {
        setStatus('idle');
        setErrorMessage('Only admin users can log in.');
        return; 
      }

      localStorage.setItem('accessToken', res.data.access_token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      setAuthData({
        accessToken: res.data.access_token,
        user: res.data.user,
      });

      setStatus('idle');
      navigate('/main/movies'); 
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
      <div className='login-main-container'>
        <div className='login-title-container'>
        <div className='typing-animation'>
                Explore Your Favorite <span className='typed-text'>{typedText}</span>
                <span className='cursor'>|</span>
              </div>
              <h1>CineSphere</h1>
              <p>
                The ultimate online hub for film lovers! Whether you're a casual viewer or a dedicated cinephile, CineSphere is designed to enhance your movie-watching experience by providing a rich database of films from every genre and era.
              </p> 
        </div>
        <form>
          <div className='login-form-container'>
          <h3 className='login-header'>Login</h3>
            <div className='login-form-group'>
              <label>E-mail:</label>
              <input
                type='text'
                name='email'
                ref={emailRef}
                value={email}
                onChange={(e) => handleOnChange(e, 'email')}
              />
              {isFieldsDirty && email === '' && (
                <span className='login-errors'>This field is required</span>
              )}
            </div>
            <div className='form-group'>
              <label>Password:</label>
              <input
                type={isShowPassword ? 'text' : 'password'}
                name='password'
                ref={passwordRef}
                value={password}
                onChange={(e) => handleOnChange(e, 'password')}
              />
              {isFieldsDirty && password === '' && (
                <span className='login-errors'>This field is required</span>
              )}
            </div>
            <div className='show-password' onClick={handleShowPassword}>
              {isShowPassword ? 'Hide' : 'Show'} Password
            </div>
            {errorMessage && (
              <div className='login-error-message'>
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
                    handleLogin();
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
                <small>Don't have an account? Register</small>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
