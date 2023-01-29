import React from 'react';
import './Card.css';

export default function Back({ id }) {
    return (
        <div className='flip-card-back'>
            <img alt='robots' src={`https://robohash.org/${id}?size=200x200`} />
        </div>
    )
}
