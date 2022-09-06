import styled from 'styled-components';

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    overflow-wrap: break-word;
    width: 20%;
`;

export const SectionPrint = styled(Section)`
    align-items: flex-end;
    width: 50%;
`;