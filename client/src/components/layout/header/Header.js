import React,{useState,useContext} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {GlobalState} from "../../../GlobalState";
import Menu from "./icon/menu.svg";
import Close from "./icon/close.svg";
import Cart from "./icon/cart.svg";

export default function Header() {
    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged;
    const [cart] = state.userAPI.cart;

    const logoutUser = async () =>{
        await axios.get("/user/logout");
        localStorage.clear();
        window.location.href="/";
    }

    const loggedRouter = () =>{
        return(
            <>
                <li><Link to="/history">History</Link></li>
                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }

    return (
        <header>
            <div className="menu">
                <img src={Menu} alt="" width="30" />
            </div>
            <div className="logo">
                <h1>
                    <Link to="/">E-Commerce</Link>
                </h1>
            </div>
            <ul>
                <li><Link to="/">Products</Link></li>
                {
                    isLogged ? loggedRouter() : <li><Link to="/login">Login ✥ Register</Link></li>
                }
                <li>
                    <img src={Close} alt="" width="30" className="menu"/>
                </li>
            </ul>
            <div className="cart-icon">
                <span>{cart.length}</span>
                <Link to="/cart">
                    <img src={Cart} alt="" width="30"/>
                </Link>
            </div>
        </header>
    );
}
