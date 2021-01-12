import React, {useContext,useState,useEffect} from 'react';
import {GlobalState} from "../../GlobalState";

export default function Filter() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search
    const [term,setTerm] = useState("");



    const handleCategory = e => {
        setCategory(e.target.value);
        setSearch('');
    }
    
    // Timer for searching
    useEffect(() => {
        const timerId = setTimeout(() => {
            console.log("timerEffectCalled");
            setSearch(term);
            console.log(search);
        }, 1000);
        return () => {
            clearTimeout(timerId);
        };
    }, [term]);

    return (
        <div className="filter_menu">
            <div className="row">
                <span>Filters: </span>
                <select name="category" value={category} onChange={handleCategory} >
                    <option value=''>All Products</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category.name} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <input type="text" value={term} placeholder="Search Cars"
            onChange={(e) => setTerm(e.target.value.toLocaleLowerCase())} />

            <div className="row sort">
                <span>Sort By: </span>
                <select value={sort} onChange={e => setSort(e.target.value)} >
                    <option value=''>Newest</option>
                    <option value='sort=-createdAt'>Oldest</option>
                    <option value='sort=-sold'>Best sales</option>
                    <option value='sort=-price'>Price: High-Low</option>
                    <option value='sort=price'>Price: Low-High</option>
                </select>
            </div>
        </div>
    )
}