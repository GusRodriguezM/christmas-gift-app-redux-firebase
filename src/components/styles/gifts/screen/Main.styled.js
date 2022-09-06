import styled from 'styled-components';

const Main = styled.main`
    height: 520px;
    width: 90%;
    background-color: ${({ theme }) => theme.colors.list};
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default Main;