import React from "react";
//Components
//Style
import { TextField } from "@mui/material";
import {Delete, AddCircleRounded} from '@mui/icons-material';
import { Wrapper, Content, ItemArray } from "./ArrayInputForm.styles";
//Hook

//Image



const ArrayInputForm = ({
        label,
        elememtsArray,
        setArray,
        inputProps,
        name
        }) => {
    
    const changeArrayField = (event, key) => {
        const tempArray = [...elememtsArray];
        tempArray[key] = event.target.value;
        setArray(name,tempArray);
    };

    const deleteArrayField = (key) => {
        const tempArray = [...elememtsArray];
        tempArray.splice(key, 1);
        setArray(name,tempArray);
    };

    const addArrayField = () => {
        const tempArray = [...elememtsArray];
        tempArray.push('');
        console.log({tempArray});
        setArray(name,tempArray);
    };


    return(
        <Wrapper>
            
            <h1>{label}</h1>
            <Content>
                
                {elememtsArray?.[0] != null
                    ? elememtsArray?.map((name, key)=>(
                    <ItemArray>
                        <TextField
                            label={key + 1}
                            value={name}
                            onChange={(event) => changeArrayField(event, key) }
                            inputProps={inputProps}
                        />
                        <Delete 
                            onClick={()=> deleteArrayField(key)}
                        />
                    </ItemArray>
                    ))
                    : null
                }

                <AddCircleRounded 
                    onClick={addArrayField}
                    fontSize="large"
                />
            </Content>


        </Wrapper>
    )

}

export default ArrayInputForm;