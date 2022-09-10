import React, {useState} from "react";
//Components
import CreateBookForm from "./CreateBookForm";
import Button from "./Button";
//Style
import { Snackbar, Alert } from "@mui/material";
//Hook
import { useFormPersistedStorage } from "../hooks/useFormPersistedStorage";
//Image

//API
import apiSettings from "../API";


const CreateBook = () => {

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        authors: "",
        categories: "",
        averageRating: "",
        publisher: "",
        publishedDate: "",
        pageCount: "",
        imageLinks: "",
    });
    const [snackBars, setSnackBars] = useState({
        open:false,
        severity:"error", //error, warning, info, success
        message: ""
    })
    const [values, setValues] = useState({
        title:"",
        description:"",
        authors:[],
        categories:[],
        averageRating:3,
        publisher:"",
        pageCount:"",
        imageLinks:""
    })
    const [datePublished, setDatePublished] = useState(new Date());

    const [firstRender, setFirstRender] = useState(true);

    //Hook
    useFormPersistedStorage({
        firstRender:firstRender,
        setFirstRender: setFirstRender,
        values:values,
        setValues:setValues,
        datePublished:{datePublished},
        setDatePublished:{setDatePublished},
    });

    
    const handleChange = (event) => {
        console.log({event});
        setValues({
          ...values,
          [event.target.name]: event.target.value,
        });
    };

    const handleChangeArray = (name, newArray) => {
        setValues({
          ...values,
          [name]: [...newArray],
        });
    };

    const setErrorMessage = (fieldName, message) => {
        setErrors(prev => ({
            ...prev,
            [fieldName]:message
        }));
    };

    const validations = {
        validateTitle :  () =>{
            console.log("validating title");
            if(!values.title){
                setErrorMessage("title", "Field Required");
                return false;
            }else{
                setErrorMessage("title", "");
            };
            return true;
        },
        validateDescription : () =>{
            if(!values.description){
                setErrorMessage("description", "Field Required");
                return false;
            }else{
                setErrorMessage("description", "");
            };
            return true;
        },
        validateAuthors : () =>{
            const tempArray = values.authors.filter(element => element !== '');
            handleChangeArray("authors", tempArray);
            return;
        },
        validateCategories : () =>{
            const tempArray = values.categories.filter(element => element !== '');
            handleChangeArray("categories", tempArray);
            return;
        },
        validatePublisher : () =>{
            if(!values.publisher){
                setErrorMessage("publisher", "Field Required");
                return false;
            }else{
                setErrorMessage("publisher", "");
            };
            return true;
        },
    }


    const submitForm = async () => {
        console.log("submit form");
        let doNotExistsErrors = true;
        //Validations
        doNotExistsErrors = validations.validateTitle();
        doNotExistsErrors = validations.validateDescription();
        doNotExistsErrors = validations.validatePublisher();
        //doNotExistsErrors = validations.validateImageLink();

        console.log({doNotExistsErrors});
        if(!doNotExistsErrors){
            changeStateSnackBar(true, "error", "Invalid fields");
            return;
        }

        validations.validateCategories();
        validations.validateAuthors();

        const {title,description,authors,categories,averageRating,publisher,pageCount,imageLinks} = values;
        //Create in API
        const requestBody = {
            title:title,
            description:description,
            authors:authors,
            categories:categories,
            averageRating:averageRating,
            publisher:publisher,
            publishedDate:datePublished,
            pageCount:pageCount,
            imageLinks:{
                thumbnail: imageLinks
            }
        }
        const response = await apiSettings.createBook(requestBody);
        console.log({response});
        console.log("ok: ", response.ok);
        //Handler response
        if(response?.ok){
            changeStateSnackBar(true, "success", response?.message || "Success");
            clearForm();
            localStorage.removeItem('create-form');
        }else{
            changeStateSnackBar(true, "error", response?.message || "Error");
        }
    }

    const handleCloseSnackBar = () =>{
        changeStateSnackBar(false, "error", "")
    }

    const changeStateSnackBar = (open, severity, message) => {
        setSnackBars({
            open:open,
            severity:severity,
            message:message
        });
    }

    const clearForm = () => {
        setValues({
            title:"",
            description:"",
            authors:[],
            categories:[],
            averageRating:3,
            publisher:"",
            pageCount:"",
            imageLinks:""
        });
        setDatePublished(new Date());
    }
    
    

    return(
        <>
            <CreateBookForm 
                errors={errors}
                validationFunctions={validations}
                values={values}
                setValues={setValues}
                handleChange={handleChange}
                handleChangeArray={handleChangeArray}
                datePublished={datePublished}
                setDatePublished={setDatePublished}
            />


            <Button 
                text="Submit"
                callback={submitForm}
            />
            
            <Snackbar
                anchorOrigin={ {vertical: 'top', horizontal: 'center'}}
                open={snackBars.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackBar}
            >
                <Alert severity={snackBars.severity}>
                    {snackBars.message}
                </Alert>
            </Snackbar>

        </>
    )

}

export default CreateBook;