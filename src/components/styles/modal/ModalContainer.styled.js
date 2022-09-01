import styled from 'styled-components';

export const ModalContainer = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.modalBackground};
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ModalContent = styled.div`
    width:  40%;
    height: 90%;
    background-color: ${({ theme }) => theme.colors.list};
`;

export const HeaderFooter = styled.div`
    padding: 5px;
    height: 5%;
`;

export const ContentBody = styled.div`
    padding: 10px;
    height: 80%;
`;