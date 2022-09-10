import { useState, useEffect, useRef } from "react";
//API
import API from '../API';

const initialState = {
    items: [],
    totalItems:0,
    //total_results:0,
    //searchTerm: ""
}

export const useHomeFetch = (categories, 
    setState, 
    setLoading, 
    setError, 
    setIsLoadingMore, 
    searchTerm, 
    state, 
    isLoadingMore, 
    isOrderedAZ) => {

    const maxResults = 10;
    

    const fetchBooks = async (actualPage = 1, category, isOrdered, search = "") => {
        try{
            console.log("inicio do fetchBooks");
            //console.log({page});
            setError(false);
            setLoading(true);
            const {items, totalItems, page} = await API.fetchBooks(actualPage, maxResults, search, category, isOrdered);
            //debugger;
            setState(prev => ({
                //...books,
                totalItems: totalItems,
                page: parseInt(page),
                items : page != 1 ? [...prev.items, ...items] : [...items],
            }));
            
        } catch(error) {
            console.log('Error: ', error);
            setError(true);
        }
        setLoading(false);
    };


    useEffect(() => {
        if(state?.items?.length >= state?.totalItems){
            setIsLoadingMore(false);
            return;
        }
        if(!isLoadingMore) return;
        fetchBooks(state?.page + 1 || 1, categories.value, isOrderedAZ , searchTerm);
        setIsLoadingMore(false);

    }, [ isLoadingMore ]);

    return {fetchBooks};
}