import styled from 'styled-components';

import AuthForm from './AuthForm.styled';

const Container = styled.div`
    width: 450px;
    height: 450px;
    background: rgba( 211, 226, 236, 0.5 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur(4px);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

Container.AuthForm = AuthForm;

export default Container;