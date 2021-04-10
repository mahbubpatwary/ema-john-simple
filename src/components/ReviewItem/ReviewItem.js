import React from 'react';

const ReviewItem = ({data, removeProduct}) => {
    const {name, quantity, img, key, price} = data;
    return (
        <div className='product_div'>
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h4>{name}</h4>
                <p>Quantity: {quantity} </p>
                <p> {price} </p>
                <br/>
                <button onClick={() => removeProduct(key)} className='add_btn'>Remove</button>
            </div>
        </div>
    );
};

export default ReviewItem;