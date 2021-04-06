import React, { useState } from 'react';
import fakeData from '../../fakeData'
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    
    const first10 = fakeData.slice(0, 10);
   const [products, setProducts] = useState(first10)
   const [cart, setCart] = useState([]);

   const handleAddProduct = (product) =>{
        const newCart = [...cart, product];
        setCart(newCart);
       console.log(product)
   }



    return (
        <div className="shop_div">
           
            <div className="products_div">
             
                {
                    products.map(pd => <Product addProduct = {handleAddProduct} key={pd.key} data={pd}></Product>)
                }
                
            </div>
            
           <Cart data={cart} ></Cart>
           
            
        </div>
    );
};

export default Shop;