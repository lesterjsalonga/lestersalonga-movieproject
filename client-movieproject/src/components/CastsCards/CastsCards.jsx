import React from 'react';
import './CastsCards.css';

function CastsCards({ cast }) {
    return (
        <div className='card-cast-data'>
            <img 
                src={cast.url} 
                alt={`${cast.name} as ${cast.characterName}`}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/default-cast-image.jpg'; 
                }}
            />
            <span className='cast-name-card'>{cast.name}</span>
            <hr className='spacing-cast-card'></hr>
            <span className='cast-characterName-card'>{cast.characterName}</span>
        </div>
    )
}

export default CastsCards;