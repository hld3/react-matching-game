import React from 'react';
import './Card.css';
import Front from './Front';
import Back from './Back';

const Card = ({ id, onClick, position, flipped }) => {
    const handleClick = () => {
        // console.log(flipped[position[0]][position[1]]);
        onClick(position);
    }
    return (
        <div className='bg-light-green dib br3 ma2 bw2 shadow-5 flip-card'>
            <div className='flip-card-inner' onClick={handleClick}>
                {flipped ? <Back id={id} /> : <Front />}
            </div>
        </div>
    )
}

export default Card;