import React from "react";
//Components
//Style
import { TextField} from "@mui/material";
import { Wrapper } from "./InputForm.styles";
//Hook

//Image



const InputForm = ({
        isRequired,
        isMultiline,
        label,
        name,
        rows,
        value,
        setValue,
        type,
        error,
        helperText,
        validationFunction,
        onInput,
        inputProps
        }) => {
    
      
    //if(loading) return <Spinner/>
    //if(error) return <div>Something went wrong...</div>
    


    return(
        <Wrapper>
            <TextField 
            required={isRequired}
            multiline={isMultiline}
            rows={isMultiline ? rows : 1}
            id="standard-basic"
            type={type}
            name={name}
            label={label}
            variant="standard"
            value={value}
            onChange={setValue}
            error={error}
            helperText={helperText}
            onBlur={validationFunction}
            onInput={onInput}
            inputProps={inputProps}
            variant='outlined'
            className="inputs"
            />

        </Wrapper>
    )
}
export default InputForm;