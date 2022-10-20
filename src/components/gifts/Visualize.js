import React from 'react';
import { useSelector } from 'react-redux';
import { Image } from '../styles/shared/Image.styled';
import { Section } from '../styles/shared/Section.styled';
import { Container } from '../styles/gifts/visualize/Visualize.styled';
import { VisualizeGift } from '../styles/gifts/Gift.styled';

export const Visualize = () => {

    const { gifts } = useSelector( state => state.gifts );

    return (
        <Container>
            {
                gifts.map(gift => (
                    <VisualizeGift key={gift.id}>
                        <Image alt={gift.name} src={gift.imageURL} />
                        <Section>
                            <h4>{gift.name} - ({gift.quantity})</h4>
                            <h4>To: {gift.toPerson}</h4>
                        </Section>
                    </VisualizeGift>
                ))
            }
        </Container>
    )
}