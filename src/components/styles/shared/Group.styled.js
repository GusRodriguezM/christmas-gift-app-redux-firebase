import styled from 'styled-components';

export const Group = styled.div`
    display: flex;
    justify-content: space-between;
    width: ${({size}) => size === 'large' ? '85%' : '40%'};
`;