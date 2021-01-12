import {useState, useEffect} from 'react';
import axios from "axios";

export default function CatgeriesAPI() {
    const [categories, setCategories] = useState([]);

    useEffect(() =>{
        const getCategories = async () =>{
            const res = await axios.get('/api/category');
            setCategories(res.data);
            console.log("getCategoryEffectCalled");
        }

        getCategories();
    },[]);
    return {
        categories: [categories, setCategories]
    }
}
