import React,{useContext} from 'react';
import {GlobalState} from "../../GlobalState";
import ProductItem from "../utils/product_item/ProductItem";
import Loading from "../utils/loading/Loading";
import Filter from "./Filter";

export default function Product() {
    const state = useContext(GlobalState);
    const [products] = state.productsAPI.products;
    console.log(state);
    return (
        <>
        <Filter/>
            <div className="products">
                {
                    products.map(product => {
                        return <ProductItem key={product._id} product={product}/>
                    })
                }
            </div>
            {products.length === 0 && <Loading/>}
        </>
    )
}
