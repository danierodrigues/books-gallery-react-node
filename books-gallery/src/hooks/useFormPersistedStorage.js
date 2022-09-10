import { useState, useEffect } from "react";

export const useFormPersistedStorage = ({
    firstRender,
    setFirstRender,
    values,
    setValues,
    datePublished,
    setDatePublished
}) => {



    const updateStorageFields = async () => {
        try{
            
            const fieldsForStorage = {
                title:values.title,
                description:values.description,
                authors:values.authors,
                categories:values.categories,
                averageRating:values.averageRating,
                publisher:values.publisher,
                publishedDate:datePublished,
                pageCount:values.pageCount,
                imageLinks:values.imageLinks
            }
            localStorage.setItem('create-form', JSON.stringify(fieldsForStorage));
            
        }catch(error) {
            console.log(error);
        }
    };

    const setFormFields = () => {
        try{
            const fieldsFromStorage = JSON.parse(localStorage.getItem('create-form'));
            console.log({fieldsFromStorage});
            if(fieldsFromStorage){
                setValues({
                    ...fieldsFromStorage
                });
                setDatePublished(fieldsFromStorage.publishedDate);
            }
            setFirstRender(false);
        }catch(error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if(firstRender){
            setFormFields();
        }else{
            updateStorageFields();
        }

        
    },[values, datePublished]);

    return;
};