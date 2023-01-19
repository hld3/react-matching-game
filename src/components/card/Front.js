import React from 'react';
import './Card.css';
import question_mark from './question_mark.png';

const Front = () => {
    return (
        <div className='flip-card-front pt4'>
            <img className='mark' alt='question mark' src={question_mark} />
        </div>
    )
}

export default Front;