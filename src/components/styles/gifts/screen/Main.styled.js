import styled from 'styled-components';

const Main = styled.main`
    height: 650px;
    width: 90%;
    background-color: ${({ theme }) => theme.colors.list};
    text-align: center;
    margin: 20px 0;
`;

export default Main;