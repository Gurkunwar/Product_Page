import React from 'react';
import styled from 'styled-components';

const StarRating = ({ rating }) => {
    const roundedRating = Math.round(rating);

    return (
        <Stars>
            {[...Array(5)].map((star, index) => {
                return (
                    <Star key={index} filled={index < roundedRating}>
                        ★
                    </Star>
                );
            })}
        </Stars>
    );
};

export default StarRating;

const Stars = styled.div`
    display: flex;
`;

const Star = styled.span`
    font-size: 20px;
    color: ${props => (props.filled ? 'gold' : 'lightgray')};
    margin-right: 5px;
`;