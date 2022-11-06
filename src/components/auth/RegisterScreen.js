import React, { useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import { removeErrorMessage, setErrorMessage } from '../../store/slices/ui';
import { startCreatingUserWithEmailPassword } from '../../store/slices/auth';

import { useForm } from '../../hooks';

import Container from '../styles/auth/Container.styled';
import Input from '../styles/elements/Input.styled';
import { Button } from '../styles/shared/Button.styled';
import Toast from '../styles/Toast/Toast';

export const RegisterScreen = () => {

    const { msgError } = useSelector( state => state.ui );
    const { status } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formValues;

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
        if(validator.isEmpty(name) && validator.isEmpty(email) && validator.isEmpty(password) && validator.isEmpty(password2)){
            dispatch( setErrorMessage('Please fill all the required fields') );
            return false;
        }else if(validator.isEmpty(name)){
            dispatch( setErrorMessage('The name is required') );
            return false;
        }else if(validator.isEmpty(email)){
            dispatch( setErrorMessage('The email is required') );
            return false;
        }else if(!validator.isEmail(email)){
            dispatch( setErrorMessage('The email is not valid') );
            return false;
        }else if(password.length < 6 && password2.length < 6){
            dispatch( setErrorMessage('The password should be at least 6 characters') );
            return false;
        }else if(password !== password2){
            dispatch( setErrorMessage('The passwords should match') );
            return false;
        }

        dispatch( removeErrorMessage() );
        return true;
    }

    const handleRegister = (e) => {
        e.preventDefault();

        if(isFormValid()){
            dispatch( startCreatingUserWithEmailPassword({email, password, displayName: name}) );
        }
        
    }

    return (
        <Container>

            <h1>Sign in</h1>

            <Container.AuthForm 
                onSubmit={handleRegister}
                aria-label='register-form'>

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

                <Input 
                    type='password'
                    placeholder='Password'
                    name='password2'
                    autoComplete='off'
                    value={password2}
                    onChange={handleInputChange}
                />

                <Button 
                    type='submit'
                    disabled={isAuthenticating}
                    inactive={isAuthenticating}
                >
                    <span>Register</span>
                    <i className="fa-solid fa-user-plus"></i>
                </Button>

            </Container.AuthForm>

            <Link
                aria-disabled={isAuthenticating}
                to='/auth/login'
            >
                Go to Login
            </Link>
            
        </Container>
    )
}