import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happimg from '../../images/giphy.gif'

const Review = () => {

    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory()


    const removeProduct = productKey => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
       
    }

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productsKeys = Object.keys(savedCart);

       const cartProducts = productsKeys.map(key => {
           const product = fakeData.find(pd => pd.key === key);
           product.quantity = savedCart[key];
           return product;
       })
        setCart(cartProducts)
    }, [])



    const hamdleProceedCheckout = ()=> {
       history.push('/shipment')
    }

    const thankYou = <img src={happimg} alt=""></img>

    return (
        <div className="shop_div">
            {
                orderPlaced && thankYou
            }
           <div className="products_div">
            {
                cart.map(pd => <ReviewItem data={pd} removeProduct={removeProduct}  key={pd.key}></ReviewItem>)
            }
             </div>

            <Cart data={cart} >
            <button className="add_btn" onClick={hamdleProceedCheckout} >Proceed chakeout</button>

            </Cart>

        </div>
    );
};

export default Review;