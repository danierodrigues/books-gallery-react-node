import React from "react";
import { useParams } from "react-router-dom";
//Components
import Spinner from "./Spinner";
import BookInfo from './BookInfo';
import BookInfoBar from "./BookInfoBar";
//import Actor from "./Actor";
//Hook
import { useBookFetch } from "../hooks/useBookFetch";


const Book = () => {
    const { bookId } = useParams();
    console.log(bookId);
    const {state: book, loading, error} = useBookFetch(bookId);
    
    if(loading) return <Spinner/>
    if(error) return <div>Something went wrong...</div>

    return(
        <>
            <BookInfo book={book} />
            <BookInfoBar publisher={book?.volumeInfo?.publisher} datePublished={book?.volumeInfo?.publishedDate} numberPages={book?.volumeInfo?.pageCount} />
        </>
    )

}

export default Book;