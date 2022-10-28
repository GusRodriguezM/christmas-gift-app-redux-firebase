import styled from 'styled-components';

export const MainButtonGroup = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
`;

export const GiftButtonGroup = styled(MainButtonGroup)`
    width: 40%;

    @media screen and (max-width: ${({ theme }) => theme.breakpoints.medium}) {
        width: 30%;
        flex-direction: column;
        align-items: center;
    }

`;