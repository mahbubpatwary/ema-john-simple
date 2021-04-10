import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';


const Product = (props) => {
    const { name, img, price, seller, stock, key } = props.data;
    
    return (
        <div className='product_div'>
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                
                <Link to={`/product/${key}`}><h4>{name} </h4></Link>

                
                <p><small>by : {seller} </small></p>
                <p>Price : ${price}</p>
                
                <small>only {stock} left in stock </small>
                <br/><br />
               {
                   props.showButton &&  <button className='add_btn' onClick={() =>props.addProduct(props.data)} ><FontAwesomeIcon icon={faShoppingCart} /> add to card</button>

               }
            </div>

        </div>
    );
};

export default Product;