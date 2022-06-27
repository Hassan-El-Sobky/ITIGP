import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

function Rating({ value, text, color }) {


    function drawStars() {
        let fullStars = Array(5).fill(<i key={uuidv4()} className="fa-solid fa-star" ></i>)

        fullStars.map((star, index) => {
            let current = index + 1
            if (current - value > 0 && current - value < 1) {
                fullStars[index] = <i key={uuidv4()} className="fa-regular fa-star-half-stroke"></i>
            }
            else if (current - value < 0) {
                fullStars[index] = <i key={uuidv4()} className="fa-solid fa-star" ></i>
            }
            else if (current - value >= 1) {
                fullStars[index] = <i key={uuidv4()} className="fa-regular fa-star"></i>
            }
        })

        return fullStars
    }





    return (
        <div style={{ color: color }}>{drawStars()} </div>
    )
}

export default Rating

Rating.propTypes = {
    value: PropTypes.number.isRequired
};

Rating.defaultProps = {
    color: '#F9DB18'
};
