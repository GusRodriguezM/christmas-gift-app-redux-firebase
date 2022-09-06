import React from 'react';
import { useSelector } from 'react-redux';
import { Print, PrintList, Total } from '../styles/gifts/print/Print.styled';
import { Image } from '../styles/shared/Image.styled';
import { SectionPrint } from '../styles/shared/Section.styled';

export const GiftListToPrint = React.forwardRef(( { total }, ref ) => {

    const { gifts } = useSelector( state => state.gifts );

    return (
        <Print ref={ref}>
            {
                gifts.map(gift => (
                    <PrintList key={gift.id}>
                        <Image alt={gift.name} src={gift.image} />

                        <SectionPrint>
                            <h4>Gift: {gift.name}</h4>
                            <h4>To: {gift.person}</h4>
                            <h4>Quantity: {gift.quantity}</h4>
                            <h4>Price: {gift.price}</h4>
                            <h4>Subtotal: {gift.total}</h4>
                        </SectionPrint>
                    </PrintList>
                ))
            }

            <Total>
                <h1>Total: ${total}</h1>
            </Total>
        </Print>
    )
})