import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { login } from '../../store/slices/auth/authSlice';
import { useForm } from '../hooks/useForm';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formValues, handleInputChange] = useForm({
        name: '',
        email: '',
        password: ''
    });

    const { name, email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        
        dispatch( login(email) );
        navigate('/', {
            replace: true
        });
    }

    return (
        <div className='login'>

            <h1 className='login__title'>Sign in</h1>

            <form onSubmit={handleLogin} className='login__form'>

                <input 
                    type='text'
                    placeholder='Name'
                    name='name'
                    className='login__form--input'
                    autoComplete='off'
                    value={name}
                    onChange={handleInputChange}
                />

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

                <button
                    type='submit'
                    className='login__form--button'
                >
                    <span>Login</span>
                </button>

            </form>
        </div>
    )
}
