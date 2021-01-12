import React, {useContext, useEffect} from 'react';
import {GlobalState} from "../../GlobalState";
import {Link} from "react-router-dom"
import axios from "axios";

export default function OrderHistory() {
    const state = useContext(GlobalState)
    console.log(state);
    const [history, setHistory] = state.userAPI.history;
    const [token] = state.token;
    

    useEffect(() => {
        if(token){
            const getHistory = async() =>{
                const res = await axios.get('/user/history', {
                    headers: {Authorization: token}
                })
                setHistory(res.data)
            }
            getHistory(); 
        }
    },[token,setHistory])

    return (
        <div className="history-page">
            <h2>Order History</h2>

            <h4>You ordered {history.length} items</h4>

            <table>
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Date of Purchased</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map(items => (
                            <tr key={items._id}>
                                <td>{items.paymentID}</td>
                                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                <td><Link to={`/history/${items._id}`}>View</Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
