import { useState, useEffect } from "react";
import API from '../API';

export const useBookFetch = bookId => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => {
        const fetchBook = async () => {
            try{
                setLoading(true);
                setError(false);
                console.log("dentro da função");
                const book = await API.fetchBook(bookId);
                console.log("depois do fetch");
                console.log({book});

                setState({
                    ...book,
                })
                
                setLoading(false);

            }catch(error) {
                console.log(error);
                setError(true);
            }
        };

        fetchBook();
    }, [bookId]);

    return {state, loading, error};
};