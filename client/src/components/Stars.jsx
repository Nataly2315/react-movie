import StarRatings from 'react-star-ratings';
import React from 'react';

const Stars = (props) => {
    const {rating, changeRating} = props;
    return (
        <StarRatings
            rating={rating}
            starRatedColor="blue"
            changeRating={changeRating}
            numberOfStars={10}
            starDimension={'20'}
            starSpacing={'5'}
            isSelectable={true}
        />
    );
}

export default Stars;