import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { login } from '../../store/slices/auth/authSlice';
import { useForm } from '../hooks/useForm';

import { apiAuth } from '../../helpers/apiAuth';
import { Button } from '../styles/shared/Button.styled';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formValues, handleInputChange] = useForm({
        email: '',
        password: ''
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        apiAuth.saveUser({email, logged: true})
            .then(console.log)
            .then(console.log);
        dispatch( login(email) );
        navigate('/gifts', {
            replace: true
        });
    }

    const handleNavigate = () => {
        navigate('/auth/register', {
            replace: true
        });
    }

    return (
        <div className='login'>

            <h1 className='login__title'>Login</h1>

            <form onSubmit={handleLogin} className='login__form'>

                <input 
                    type='text'
                    placeholder='Email'
                    name='email'
                    className='login__form--input'
                    autoComplete='off'
                    value={email}
                    onChange={handleInputChange}
                />

                <input 
                    type='password'
                    placeholder='Password'
                    name='password'
                    className='login__form--input'
                    autoComplete='off'
                    value={password}
                    onChange={handleInputChange}
                />

                <Button type='submit' >
                    <span>Login</span>
                </Button>

            </form>

            <span>Sign in</span>
            <Button
                onClick={handleNavigate}
            >
                Register
            </Button>
        </div>
    )
}
