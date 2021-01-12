import React from 'react';
import {Switch,Route} from "react-router-dom";
import Products from "../products/Product";
import DetailProduct from "../detail_product/DetailProduct";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Cart from "../cart/Cart";
import OrderHistory from "../history/OrderHistory";
import OrderDetails from "../history/OrderDetails";
import NotFound from "../utils/not_found/NotFound";

export default function Pages() {
    return (
        <Switch>
            <Route path="/" exact component={Products}/>
            <Route path="/detail/:id" exact component={DetailProduct}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/history" exact component={OrderHistory}/>
            <Route path="/history/:id" exact component={OrderDetails} />
            <Route path="/cart" exact component={Cart}/>
            <Route path="*" exact component={NotFound}/>
        </Switch>
    )
}
