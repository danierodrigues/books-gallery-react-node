import { useState, useEffect } from "react";
import API from '../API';

export const useCategoriesFetch = ({categoriesArray, setCategories}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => {
        const fetchCategories = async () => {
            try{
                setLoading(true);
                setError(false);
                const {categories} = await API.fetchCategories();
                console.log({categories});
                setCategories([...categoriesArray, ...categories]);
                
                setLoading(false);
                console.log({categories});
            }catch(error) {
                console.log(error);
                setError(true);
            }
        };

        fetchCategories();
    }, []);

    return {loading, error};
};