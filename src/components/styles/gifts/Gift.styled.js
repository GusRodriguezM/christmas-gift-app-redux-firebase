import styled from 'styled-components';

import Image from './Image.styled';
import Section from './Section.styled';

const GiftContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin: 10px 0;
`;

GiftContainer.Image = Image;
GiftContainer.Section = Section;

export default GiftContainer;