import React, {useState} from "react";
//Components
import ArrayInputForm from "../ArrayInputForm";
import InputForm from "../InputForm";
//Style
import { TextField, Typography, Rating } from "@mui/material";
import { FormWrapper, Content } from "./CreateBookForm.styles";
import DatePicker from "react-datepicker";
//Hook

//Image



const CreateBookForm = ({
        errors,
        validationFunctions,
        values,
        handleChange,
        handleChangeArray,
        datePublished,
        setDatePublished
        }) => {
    
      
    //if(loading) return <Spinner/>
    //if(error) return <div>Something went wrong...</div>
    
        console.log("inicio: ", values?.publishedDate);

    return(
        <FormWrapper>
            <Content>
                <h1>Create Book</h1>
                <InputForm 
                    isRequired={true}
                    isMultiline={false}
                    label="Title"
                    name="title"
                    value={values.title}
                    setValue={handleChange}
                    error={Boolean(errors?.title)}
                    helperText={errors?.title}
                    validationFunction={validationFunctions.validateTitle}
                    inputProps={{maxLength:50}}
                />

                <InputForm 
                    isRequired={true}
                    isMultiline={true}
                    rows={10}
                    label="Description"
                    name="description"
                    value={values.description}
                    setValue={handleChange}
                    error={Boolean(errors?.description)}
                    helperText={errors?.description}
                    validationFunction={validationFunctions.validateDescription}
                    inputProps={{maxLength:255}}
                />

                <InputForm 
                    isRequired={true}
                    isMultiline={false}
                    label="Publisher"
                    value={values.publisher}
                    setValue={handleChange}
                    name="publisher"
                    error={Boolean(errors?.publisher)}
                    helperText={errors?.publisher}
                    validationFunction={validationFunctions.validatePublisher}
                    inputProps={{maxLength:30}}
                />

            {/**    <InputForm 
                    isRequired={false}
                    isMultiline={false}
                    label="Published Date"
                    name="publishedDate"
                    value={values.publishedDate}
                    setValue={handleChange}
                /> */} 

                <DatePicker 
                    //selected={values?.publishedDate != undefined ? values?.publishedDate : new Date()}
                    selected={datePublished}
                    //dateFormat="dd-MM-yyyy"
                    onChange={(date) => {
                        //console.log(values?.publishedDate);
                        //let event = {target:{}};
                        console.log(date);
                        //event.target.name = "publishedDate";
                        //event.target.value = date;//String(date);
                        setDatePublished(date);
                    }}
                    className="datepicker"
                />

                <InputForm 
                    isRequired={false}
                    isMultiline={false}
                    label="Pages number"
                    name="pageCount"
                    value={values.pageCount}
                    setValue={handleChange}
                    type="number"
                    onInput={(e) =>{ e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,6)}}
                />
                
                <InputForm 
                    isRequired={false}
                    isMultiline={false}
                    label="Image Link"
                    name="imageLinks"
                    value={values.imageLinks}
                    setValue={handleChange}
                />

                <br></br>
                <Typography component="legend">Rating</Typography>
                <Rating
                precision={0.5}
                value={values.averageRating}
                name="averageRating"
                onChange={(event, newValue) => {
                    event.target.value = parseInt(newValue);
                    handleChange(event);
                }}
                />
                
                <br></br>
                <ArrayInputForm
                    label="Authors"
                    array={values.authors}
                    name="authors"
                    setArray={handleChangeArray}
                    inputProps={{maxLength:20}}
                />

                <br></br>
                <ArrayInputForm
                    label="Categories"
                    elememtsArray={values.categories}
                    name="categories"
                    setArray={handleChangeArray}
                    inputProps={{maxLength:20}}
                />
            </Content>
        </FormWrapper>
    )

}

export default CreateBookForm;