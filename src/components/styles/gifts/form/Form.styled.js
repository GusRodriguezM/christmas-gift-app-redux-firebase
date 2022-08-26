import styled from 'styled-components';

export const Form = styled.form`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    margin: 0 10px;
    background-color: ${({ theme }) => theme.colors.list};
`;