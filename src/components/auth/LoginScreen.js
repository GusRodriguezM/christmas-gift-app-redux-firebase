import React, { useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/slices/auth';
import { removeErrorMessage, setErrorMessage } from '../../store/slices/ui';
import { useForm } from '../../hooks';

import { Button } from '../styles/shared/Button.styled';
import Container from '../styles/auth/Container.styled';
import Input from '../styles/elements/Input.styled';
import Toast from '../styles/Toast/Toast';

export const LoginScreen = () => {

    const { status } = useSelector( state => state.auth );
    const { msgError } = useSelector( state => state.ui );
    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm({
        email: '',
        password: ''
    });

    const { email, password } = formValues;

    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    useEffect(() => {
        if(msgError.length > 0){
            Toast.fire({
                icon: 'error',
                title: `${msgError}`
            });
        }
    }, [msgError]);

    const isFormValid = () => {
        if(validator.isEmpty(email) && validator.isEmpty(password)){
            dispatch( setErrorMessage('Email and password are required') );
            return false;
        }else if(validator.isEmpty(email)){
            dispatch( setErrorMessage('The email is required') );
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
        
        if(isFormValid())
            dispatch( startLoginWithEmailPassword({email, password}) );
    }

    const handleGoogleSignIn = () => {
        dispatch( startGoogleSignIn() );
    }

    return (
        <Container>

            <h1>Login</h1>

            <Container.AuthForm onSubmit={handleLogin}>

                <Input
                    id='name'
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
                    <span>Login</span>
                    <i className="fa-solid fa-user-lock"></i>
                </Button>

                <Button 
                    onClick={handleGoogleSignIn}
                    disabled={isAuthenticating}
                    inactive={isAuthenticating}
                >
                    <span>Google Login</span>
                    <i className="fa-brands fa-google"></i>
                </Button>

            </Container.AuthForm>

            <Link
                aria-disabled={isAuthenticating}
                to='/auth/register'
            >
                Create a new account
            </Link>
        </Container>
    )
}