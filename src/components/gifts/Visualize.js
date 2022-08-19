import React from 'react';
import { useSelector } from 'react-redux';

export const Visualize = () => {

    const { gifts } = useSelector( state => state.gifts );

    return (
        <div>
            {
                gifts.map(gift => (
                    <div key={gift.id}>
                        <img style={{width: '100px', height: '100px'}} alt={gift.name} src={gift.image} />
                        <div>
                            <h4>{gift.name} - ({gift.quantity})</h4>
                            <h4>To: {gift.person}</h4>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}