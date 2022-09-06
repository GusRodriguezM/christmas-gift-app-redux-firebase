import styled from 'styled-components';

export const List = styled.div`
    width: 100%;
    height: 400px;
    margin: 10px 0;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Empty = styled(List)`
    justify-content: center;
    overflow: auto;
`;

export const Print = styled.div`
    display: none;
`;