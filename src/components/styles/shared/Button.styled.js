import styled, { css } from 'styled-components';

export const Button = styled.button`
    padding: 5px 5px;
    margin: 5px 0;
    text-align: center;
    color: ${({ theme }) => theme.colors.white};
    border-radius: 5px;
    cursor: pointer;
    border: none;
    line-height: 1;
    width: 100px;
    //Conditional color: if inactive is true the button would be gray else will be blue
    background-color: ${({inactive}) => inactive ? css`${({ theme }) => theme.colors.disabledButton}` : css`${({ theme }) => theme.colors.loginButton}`};

    @media screen and (max-width: ${({ theme }) => theme.breakpoints.mobileLarge}) {
        span {
            display: none;
        }
    }

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.mobileLargePlus1}) and (max-width: ${({ theme }) => theme.breakpoints.xlarge}){
        i {
            display: none;
        }
    }
`;

export const GiftButton = styled(Button)`
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({inactive}) => inactive ? css`${({ theme }) => theme.colors.disabledButton}` : css`${({ theme }) => theme.colors.red}`};
`;