import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { login } from '../../store/slices/auth/authSlice';
import { useForm } from '../hooks/useForm';
import Container from '../styles/auth/Container.styled';
import Input from '../styles/elements/Input.styled';
import { Button } from '../styles/shared/Button.styled';

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

    const handleNavigate = () => {
        navigate('/auth/login', {
            replace: true
        });
    }

    return (
        <Container>

            <h1 className='login__title'>Sign in</h1>

            <Container.AuthForm onSubmit={handleLogin} className='login__form'>

                <Input
                    type='text'
                    placeholder='Name'
                    name='name'
                    className='login__form--input'
                    autoComplete='off'
                    value={name}
                    onChange={handleInputChange}
                />

                <Input 
                    type='text'
                    placeholder='Email'
                    name='email'
                    className='login__form--input'
                    autoComplete='off'
                    value={email}
                    onChange={handleInputChange}
                />

                <Input 
                    type='password'
                    placeholder='Password'
                    name='password'
                    className='login__form--input'
                    autoComplete='off'
                    value={password}
                    onChange={handleInputChange}
                />

                <Button type='submit'>
                    <span>Login</span>
                </Button>

            </Container.AuthForm>

            <Container.Span>I already have an account</Container.Span>
            <Button
                onClick={handleNavigate}
            >
                Login
            </Button>
        </Container>
    )
}
