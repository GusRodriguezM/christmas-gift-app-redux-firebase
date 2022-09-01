import styled from 'styled-components';

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    overflow-wrap: break-word;
`;

export const SectionPrint = styled(Section)`
    align-items: flex-end;
    width: 50%;
`;