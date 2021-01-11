import React,{useContext} from 'react';
import {Link} from "react-router-dom";
import {GlobalState} from "../../GlobalState";

export default function BtnRender({product}) {
    const state = useContext(GlobalState);
    const addCart = state.userAPI.addCart;

    return (
        <div className="row_btn">
            <Link id="btn_view" to={`/detail/${product._id}`}>
                View
            </Link>
            <Link id="btn_buy" to="#" onClick={() =>{addCart(product);}}>
                Buy
            </Link>
        </div>
    )
}
