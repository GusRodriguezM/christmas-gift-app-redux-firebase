import styled from 'styled-components';

const Main = styled.main`
    height: 520px;
    width: 90%;
    background-color: ${({ theme }) => theme.colors.list};
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (min-width: ${({ theme }) => theme.breakpoints.mobileMedium}) and (max-width: ${({ theme }) => theme.breakpoints.mobileLargeLimit}) {
        height: 490px;
    }

    @media screen and (min-width: 435px) and (max-width: 459px) {
        height: 470px;
    }
`;

export default Main;