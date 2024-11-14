import { useState, useRef, useCallback, useEffect } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../utils/hooks/useDebounce';
import axios from 'axios';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [isFieldsDirty, setIsFieldsDirty] = useState(false);
    const navigate = useNavigate();
    
    const handleOnChange = (event, setter) => {
        setter(event.target.value);
        setIsFieldsDirty(true);
    };

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        const data = { firstName, middleName, lastName, email, password, contactNo };
        try {
            await axios.post('/user/register', data);
            navigate('/'); 
        } catch (error) {
            console.error(error); 
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => handleOnChange(e, setFirstName)} className="input-field" />
            <input type="text" placeholder="Middle Name" value={middleName} onChange={(e) => handleOnChange(e, setMiddleName)} className="input-field" />
            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => handleOnChange(e, setLastName)} className="input-field" />
            <input type="email" placeholder="Email" value={email} onChange={(e) => handleOnChange(e, setEmail)} className="input-field" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => handleOnChange(e, setPassword)} className="input-field" />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => handleOnChange(e, setConfirmPassword)} className="input-field" />
            <input type="tel" placeholder="Contact No." value={contactNo} onChange={(e) => handleOnChange(e, setContactNo)} className="input-field" />
            <button onClick={handleRegister} className="register-button">Register</button>
            <button onClick={() => navigate('/')} className="back-button">Back to Login</button>
        </div>
    );
}

export default Register;