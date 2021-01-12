import React,{useContext} from 'react';
import {GlobalState} from "../../GlobalState";
import ProductItem from "../utils/product_item/ProductItem";
import Loading from "../utils/loading/Loading";
import Filter from "./Filter";
import LoadMore from "./LoadMore";

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
            <LoadMore />
            {products.length === 0 && <Loading/>}
        </>
    )
}
