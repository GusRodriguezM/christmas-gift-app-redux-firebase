import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import validator from 'validator';

import { login } from '../../store/slices/auth/authSlice';
import { useForm } from '../hooks/useForm';
import Container from '../styles/auth/Container.styled';
import Input from '../styles/elements/Input.styled';
import { Button } from '../styles/shared/Button.styled';
import { Span } from '../styles/shared/Span.styled';
import { removeErrorMessage, setErrorMessage } from '../../store/slices/ui';
import { startCreatingUserWithEmailPassword } from '../../store/slices/auth';

export const RegisterScreen = () => {

    const { msgError } = useSelector( state => state.ui );
    const { status } = useSelector( state => state.auth );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formValues, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formValues;

    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    const isFormValid = () => {
        if(validator.isEmpty(name) && validator.isEmpty(email) && validator.isEmpty(password) && validator.isEmpty(password2)){
            dispatch( setErrorMessage('This fields are required') );
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
        }else if(password.length !== 6 && password2.length !== 6){
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
            // console.log('success');
            // dispatch( login(email) );
            // navigate('/', {
            //     replace: true
            // });
        }
        
    }

    const handleNavigate = () => {
        navigate('/auth/login', {
            replace: true
        });
        dispatch( removeErrorMessage() );
    }

    return (
        <Container>

            <h1>Sign in</h1>

            {
                msgError && (
                    <span>{msgError}</span>
                )
            }

            <Container.AuthForm onSubmit={handleRegister}>

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
                    Register
                </Button>

            </Container.AuthForm>

            <Span>I already have an account</Span>

            <Button
                onClick={handleNavigate}
                disabled={isAuthenticating}
                inactive={isAuthenticating}
            >
                Login
            </Button>
            
        </Container>
    )
}
