import React, {useEffect, useRef, useState} from "react";
import useInView from 'react-cool-inview';

//Components
import CoverImage from "./CoverImage";
import Grid from "./Grid";
import Spinner from './Spinner';
import Thumb from "./Thumb";
import SearchBar from "./SearchBar";
import Filters from "./Filters";

//Hook
import { useHomeFetch } from "../hooks/useHomeFetch";
import { useCategoriesFetch } from "../hooks/useCategoriesFetch";
//Image
import NoImage from '../images/no_image.jpg';

const Home = () => {
    const [isOrderedAZ, setOrder] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);


    const [category, setcategory] = useState(
        {value:"Nothing", label: "No Filter" }
        );
    const [categories, setCategories] = useState(
        ["Nothing"]
        );
    
    const { fetchBooks } = useHomeFetch(
        category, 
        setState, 
        setLoading, 
        setError, 
        setIsLoadingMore, 
        searchTerm, 
        state,
        isLoadingMore,
        isOrderedAZ);

    useCategoriesFetch({categoriesArray:categories, setCategories:setCategories});

    console.log(state);
    console.log({categories});

    const orderState = (isOrderAZ) => {
        setOrder(isOrderAZ);
        fetchBooks(1, category.value, isOrderAZ, searchTerm)
    };

    const filterByCategory = (category) => {
        console.log("categoria na função: ", category);
        console.log({isLoadingMore});
        setcategory(category);
        fetchBooks(1, category.value, isOrderedAZ, searchTerm);
    };

    const searchBy = (title) => {
        setSearchTerm(title);
        fetchBooks(1, category.value, isOrderedAZ, title);
    };

    const { observe } = useInView({
        onEnter: () => {
            setIsLoadingMore(true);
        },
    });

    if(error) return <div>Something went wrong...</div>
    
    const volumeInfo = state?.items[0]?.volumeInfo;
    //const {title = '', imageLinks = {thumbnail :''}, description=''} = state?.items[0]?.volumeInfo;


    return (
        <>
        {!searchTerm && state?.items[0] ? (
                <CoverImage 
                    image={volumeInfo?.imageLinks?.thumbnail ? volumeInfo?.imageLinks?.thumbnail : NoImage}
                    title={volumeInfo?.title}
                    text={volumeInfo?.description}
                />
            ) : null}


            <SearchBar startSearch={searchBy}/>
            <Filters 
                isOrderedAZ={isOrderedAZ}
                orderState={orderState}
                filterByCategories={filterByCategory}
                categories={categories}
                />
            <Grid header={searchTerm ? 'Search Result' : 'Popular Books'}>
                {state?.items[0] ? state?.items.map(book => (
                    <Thumb 
                    key={book._id} 
                    clickable 
                    image={book.volumeInfo?.imageLinks?.thumbnail}
                    bookId={book._id}
                    bookTitle={book.volumeInfo?.title}
                    />
                ))
                : <h1>No results found.</h1>}
            </Grid>
            { loading && <Spinner  />}
            {<button ref={observe} style={{'visibility':'hidden'}} ></button>}
        </>
    );
};

export default Home;