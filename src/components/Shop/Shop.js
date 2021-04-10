import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    
    const first10 = fakeData.slice(0, 10);
   const [products, setProducts] = useState(first10)
   const [cart, setCart] = useState([]);



   useEffect(() => {
       const savedCart = getDatabaseCart();
       const productsKeys = Object.keys(savedCart);
       const previousCart = productsKeys.map(pdkey =>{
           const product = fakeData.find(pd => pd.key === pdkey);
           product.quantity = savedCart[pdkey];
           return product;
       })
       setCart(previousCart)
   },[])



   const handleAddProduct = (product) =>{
       const toBeAddedKey = product.key;
       const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
       let count;
       let newCart;
       sameProduct ? count = sameProduct.quantity + 1 : count = 1 ;

       product.quantity = count;
       const otherProduct = cart.filter(pd => pd.key !== product.key);
         newCart = [...otherProduct, product];
        setCart(newCart);
       

       addToDatabaseCart(product.key, count);
   }





    return (
        <div className="shop_div">
           
            <div className="products_div">
             
                {
                    products.map(pd => <Product showButton={true} addProduct = {handleAddProduct} key={pd.key} data={pd}></Product>)
                }
                
            </div>
            
           <Cart data={cart} >
                <Link to='/review'><button className="add_btn" >Add to review</button></Link>

           </Cart>
           
            
        </div>
    );
};

export default Shop;