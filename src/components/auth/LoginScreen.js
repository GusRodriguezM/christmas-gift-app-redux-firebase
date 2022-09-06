import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { login } from '../../store/slices/auth/authSlice';
import { useForm } from '../hooks/useForm';

import { apiAuth } from '../../helpers/apiAuth';
import { Button } from '../styles/shared/Button.styled';

import Container from '../styles/auth/Container.styled';
import Input from '../styles/elements/Input.styled';
import { Span } from '../styles/shared/Span.styled';

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
        <Container>

            <h1>Login</h1>

            <Container.AuthForm onSubmit={handleLogin}>

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

                <Button type='submit' >
                    <span>Login</span>
                </Button>

            </Container.AuthForm>

            <Span>
                Sign in
            </Span>

            <Button
                onClick={handleNavigate}
            >
                Register
            </Button>
        </Container>
    )
}
