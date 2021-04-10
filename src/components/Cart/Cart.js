import React from 'react';

import './Cart.css'

const Cart = (props) => {
    const totalPrice = props.data.reduce((total, pd)=> total + pd.price * Number(pd.quantity),0).toFixed(2);

    let shipping =0;
    if(totalPrice > 35){
        shipping = 0;
    } else if(totalPrice > 15){
        shipping = 4.99;
    }else if(totalPrice > 1){
        shipping = 12.99;
    }
    const tax = (totalPrice * 0.1).toFixed(2)
    const grandTotal = (Number(totalPrice) + shipping + Number(tax)).toFixed(2);


    return (
        <div className="cart_div">
                <h4>Order summry</h4>
                <p>Items ordered {props.data.length} </p>
                <p>Product Price: {totalPrice}</p>
                <p><small>Shipping charges : {shipping}</small></p>
                <p><small>VAt + tax : {tax}</small></p>
                <p>Total price : {grandTotal} </p>
                {
                    props.children
                }
        </div>
    );
};

export default Cart;