import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { login } from '../../store/slices/auth/authSlice';
import { useForm } from '../hooks/useForm';
import Container from '../styles/auth/Container.styled';
import Input from '../styles/elements/Input.styled';
import { Button } from '../styles/shared/Button.styled';
import { Span } from '../styles/shared/Span.styled';

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

            <h1>Sign in</h1>

            <Container.AuthForm onSubmit={handleLogin}>

                <Input
                    type='text'
                    placeholder='Name'
                    name='name'
                    autoComplete='off'
                    value={name}
                    onChange={handleInputChange}
                />

                <Input 
                    type='text'
                    placeholder='Email'
                    name='email'
                    autoComplete='off'
                    value={email}
                    onChange={handleInputChange}
                />

                <Input 
                    type='password'
                    placeholder='Password'
                    name='password'
                    autoComplete='off'
                    value={password}
                    onChange={handleInputChange}
                />

                <Button type='submit'>
                    <span>Login</span>
                </Button>

            </Container.AuthForm>

            <Span>I already have an account</Span>

            <Button
                onClick={handleNavigate}
            >
                Login
            </Button>
            
        </Container>
    )
}
