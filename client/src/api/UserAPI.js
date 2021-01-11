import React,{useState,useEffect} from 'react';
import axios from "axios";

export default function UserAPI(token) {
    const [isLogged,setIsLogged] = useState(false);
    const [cart,setCart] = useState([]);

    useEffect(()=>{
        if(token){
            const getUser = async ()=>{
                try{
                    const res = await axios.get("user/info",{
                        headers:{Authorization:token}
                    })
                    setIsLogged(true);
                    setCart(res.data.cart);
                }catch(err){
                    alert(err.response.data.msg)
                }
            }
            getUser();
        }
    },[token])

    const addCart = async (product) => {
        if(!isLogged) return alert("Please sign in to buy products!");

        const check = cart.every(item=>{
            return item._id !== product._id
        })
        if(check){
            setCart([...cart,{...product,quantity:1}]);
            try{
                const res = await axios.patch("user/addcart",{cart:[...cart,{...product,quantity:1}]},{
                    headers:{Authorization:token} 
                });
                console.log(res);
            }catch(err){
                console.log(err.response.data.msg);
            }
        }else{
            alert("This product has already been added to cart");
        }
    }

    return (
        {
            isLogged:[isLogged,setIsLogged],
            cart:[cart,setCart],
            addCart:addCart
        }
    )
}
