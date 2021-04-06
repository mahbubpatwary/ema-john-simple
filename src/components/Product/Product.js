import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee , faShoppingCart} from '@fortawesome/free-solid-svg-icons'


const Product = (props) => {
    const { name, img, price, seller, stock } = props.data;
    console.log(props)
    return (
        <div className='product_div'>
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h5>{name} </h5>
                
                <p><small>by : {seller} </small></p>
                <p>Price : ${price}</p>
                
                <small>only {stock} left in stock </small>
                <br/><br />
                <button onClick={() =>props.addProduct(props.data)} ><FontAwesomeIcon icon={faShoppingCart} /> add to card</button>

            </div>

        </div>
    );
};

export default Product;