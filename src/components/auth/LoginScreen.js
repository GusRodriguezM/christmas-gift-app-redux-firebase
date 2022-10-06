import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../../store/slices/auth/authSlice';

import validator from 'validator';

import { useForm } from '../hooks/useForm';

import { apiAuth } from '../../helpers/apiAuth';
import { Button } from '../styles/shared/Button.styled';
import Container from '../styles/auth/Container.styled';
import Input from '../styles/elements/Input.styled';
import { Span } from '../styles/shared/Span.styled';
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from '../../store/slices/auth';
import { removeErrorMessage, setErrorMessage } from '../../store/slices/ui';

export const LoginScreen = () => {

    const { status } = useSelector( state => state.auth );
    const { msgError } = useSelector( state => state.ui );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formValues, handleInputChange] = useForm({
        email: '',
        password: ''
    });

    const { email, password } = formValues;

    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    const isFormValid = () => {
        if(validator.isEmpty(email) && validator.isEmpty(password)){
            dispatch( setErrorMessage('This fields are required') );
            return false;
        }else if(validator.isEmpty(email)){
            dispatch( setErrorMessage('The name is required') );
            return false;
        }else if(!validator.isEmail(email)){
            dispatch( setErrorMessage('The email is not valid') );
            return false;
        }else if(validator.isEmpty(password)){
            dispatch( setErrorMessage('The password is required') );
            return false;
        }

        dispatch( removeErrorMessage() );
        return true;
    }

    const handleLogin = (e) => {
        e.preventDefault();
        // apiAuth.saveUser({email, logged: true})
        //     .then(console.log)
        //     .then(console.log);
        // dispatch( login(email) );
        // navigate('/gifts', {
        //     replace: true
        // });

        if(isFormValid())
            dispatch( startLoginWithEmailPassword({email, password}) );
    }

    const handleGoogleSignIn = () => {
        dispatch( startGoogleSignIn() );
    }

    const handleNavigate = () => {
        navigate('/auth/register', {
            replace: true
        });
        dispatch( removeErrorMessage() );
    }

    return (
        <Container>

            <h1>Login</h1>

            {
                msgError && (
                    <span>{msgError}</span>
                )
            }

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

                <Button 
                    type='submit'
                    disabled={isAuthenticating}
                    inactive={isAuthenticating}
                >
                    Login
                </Button>

                <Button 
                    onClick={handleGoogleSignIn}
                    disabled={isAuthenticating}
                    inactive={isAuthenticating}
                >
                    Google Login
                </Button>

            </Container.AuthForm>

            <Span>
                Sign in
            </Span>

            <Button
                onClick={handleNavigate}
                disabled={isAuthenticating}
                inactive={isAuthenticating}
            >
                Register
            </Button>
        </Container>
    )
}
