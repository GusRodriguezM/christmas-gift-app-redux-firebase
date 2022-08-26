import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavBar = styled.nav`
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 0.5rem 0;
    background-color: ${({ theme }) => theme.colors.navbar};;
    color: ${({ theme }) => theme.colors.black};
    box-shadow: 0 2px 2px 2px ${({ theme }) => theme.colors.boxShadow};;
`;

export const BrandName = styled(Link)`
    color: ${({ theme }) => theme.colors.black};
    margin-left: 1rem;
    text-decoration: none;
`;

export const NavContent = styled.div`
    margin-right: 1rem;
`;

export const NavInfo = styled.div`
    width: 350px;
    display: flex;
    justify-content: space-around;
`;