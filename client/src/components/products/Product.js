import React,{useContext} from 'react';
import {GlobalState} from "../../GlobalState";
import ProductItem from "../utils/product_item/ProductItem";

export default function Product() {
    const state = useContext(GlobalState);
    console.log(state.ProductsAPI.products)
    const [products] = state.ProductsAPI.products;
    return (
        <div className="products">
            {
                products.map(product => {
                    return <ProductItem key={product._id} product={product}/>
                })
            }
        </div>
    )
}
