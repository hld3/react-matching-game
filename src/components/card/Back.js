import React from 'react';
import './Card.css';

const Back = ({ id }) => {
    return (
        <div className='flip-card-back'>
            <img alt='robots' src={`https://robohash.org/${id}?size=200x200`} />
        </div>
    )
}

export default Back;