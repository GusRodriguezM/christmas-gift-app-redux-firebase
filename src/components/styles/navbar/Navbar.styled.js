import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavBar = styled.nav`
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 0.5rem 0;
    margin-bottom: 20px;
    background-color: ${({ theme }) => theme.colors.navbar};;
    color: ${({ theme }) => theme.colors.black};
    box-shadow: 0 2px 2px 2px ${({ theme }) => theme.colors.boxShadow};;
`;

export const BrandName = styled(Link)`
    color: ${({ theme }) => theme.colors.black};
    margin-left: 1rem;
    text-decoration: none;
`;

export const NavInfo = styled.div`
    width: 30%;
    margin-right: 0.5rem;
    display: flex;
    justify-content: space-between;

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.mobileMedium}) and (max-width: ${({ theme }) => theme.breakpoints.medium}) {
        width: 50%;
    }

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.mediumPlus1}) and (max-width: ${({ theme }) => theme.breakpoints.large}) {
        width: 40%;
    }
`;