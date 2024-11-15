import { useState, useRef, useCallback, useEffect } from 'react';
import './Register.css'; 
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../utils/hooks/useDebounce';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [isFieldsDirty, setIsFieldsDirty] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [status, setStatus] = useState('idle');

  const navigate = useNavigate();

  const handleShowPassword = useCallback(() => {
    setIsShowPassword((value) => !value);
  }, [isShowPassword]);

  const handleOnChange = (event, type) => {
    setIsFieldsDirty(true);

    switch (type) {
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      case 'confirmPassword':
        setConfirmPassword(event.target.value);
        break;
      case 'firstName':
        setFirstName(event.target.value);
        break;
      case 'middleName':
        setMiddleName(event.target.value);
        break;
      case 'lastName':
        setLastName(event.target.value);
        break;
      case 'contactNo':
        setContactNo(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const data = {
      email,
      password,
      firstName,
      middleName,
      lastName,
      contactNo,
      role: 'admin', 
    };
    setStatus('loading');

    try {
      const response = await axios({
        method: 'POST',
        url: '/admin/register',
        data,
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
      console.log(response);
      navigate('/');
      setStatus('idle');
    } catch (error) {
      console.log(error);
      setStatus('idle');
    }
  };

  return (
    <div className='Register'>
      <div className='main-container'>
        <h3>Register</h3>
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
              {isFieldsDirty && email === '' && <span className='errors'>This field is required</span>}
            </div>

            <div>
              <div className='form-group'>
                <label>First Name:</label>
                <input
                  type='text'
                  name='firstName'
                  ref={emailRef}
                  onChange={(e) => handleOnChange(e, 'firstName')}
                />
              </div>
              {isFieldsDirty && firstName === '' && <span className='errors'>This field is required</span>}
            </div>

            <div>
              <div className='form-group'>
                <label>Middle Name:</label>
                <input
                  type='text'
                  name='middleName'
                  ref={emailRef}
                  onChange={(e) => handleOnChange(e, 'middleName')}
                />
              </div>
            </div>

            <div>
              <div className='form-group'>
                <label>Last Name:</label>
                <input
                  type='text'
                  name='lastName'
                  ref={emailRef}
                  onChange={(e) => handleOnChange(e, 'lastName')}
                />
              </div>
              {isFieldsDirty && lastName === '' && <span className='errors'>This field is required</span>}
            </div>

            <div>
              <div className='form-group'>
                <label>Contact No:</label>
                <input
                  type='text'
                  name='contactNo'
                  ref={emailRef}
                  onChange={(e) => handleOnChange(e, 'contactNo')}
                />
              </div>
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
              {isFieldsDirty && password === '' && <span className='errors'>This field is required</span>}
            </div>

            <div>
              <div className='form-group'>
                <label>Confirm Password:</label>
                <input
                  type={isShowPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  ref={confirmPasswordRef}
                  onChange={(e) => handleOnChange(e, 'confirmPassword')}
                />
              </div>
              {isFieldsDirty && confirmPassword === '' && <span className='errors'>This field is required</span>}
            </div>

            <div className='show-password' onClick={handleShowPassword}>
              {isShowPassword ? 'Hide' : 'Show'} Password
            </div>

            <div className='submit-container'>
              <button
                type='button'
                disabled={status === 'loading'}
                onClick={() => {
                  if (status === 'loading') {
                    return;
                  }
                  handleRegister();
                }}
              >
                {status === 'idle' ? 'Register' : 'Loading'}
              </button>
            </div>
            <div className='login-container'>
              <a href='/'>
                <small>Already have an account? Login</small>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
