import styled from 'styled-components';

export const Image = styled.img`
    height: 100px;
    width: 100px;

    @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobileMedium}) {
        height: 60px;
        width: 60px;
        border: 1px solid blue;
    }

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.mobileMediumPlus1}) and (max-width: ${({ theme }) => theme.breakpoints.medium}){
        height: 80px;
        width: 80px;
        border: 1px solid green;
    }
`;