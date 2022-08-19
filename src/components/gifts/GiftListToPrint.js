import React from 'react';
import { useSelector } from 'react-redux';

export const GiftListToPrint = React.forwardRef(( { total }, ref ) => {

    const { gifts } = useSelector( state => state.gifts );

    return (
        <div ref={ref}>
            {
                gifts.map(gift => (
                    <div key={gift.id}>
                        <img style={{width: '100px', height: '100px'}} alt={gift.name} src={gift.image} />

                        <div>
                            <h4>Gift: {gift.name}</h4>
                            <h4>To: {gift.person}</h4>
                            <h4>Quantity: {gift.quantity}</h4>
                            <h4>Price: {gift.price}</h4>
                            <h4>Subtotal: {gift.total}</h4>
                        </div>
                    </div>
                ))
            }

            <div>
                <h1>Total: ${total}</h1>
            </div>
        </div>
    )
})