import React from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
//Styles
import { Wrapper, Content, FilterAlpha, DropdownCategories } from "./Filters.styles";

//Images
import SortAZ from '../../images/icon-sort-a-z.png';
import SortZA from '../../images/icon-sort-z-a.png';


const options = [
    {value:"Nothing", label: "No Filter" },
    {value:"Fiction",  label: "Fiction" },
    {value:"Juvenile Fiction",  label: "Juvenile Fiction" },
    {value:"Biography & Autobiography",  label: "Biography & Autobiography" },
    {value:"Self-Help", label: "Self-Help" }
];
const defaultOption = options[0];


const Filters = ({isOrderedAZ, orderState, filterByCategories, categories }) => {

    return(
        <Wrapper>
            <Content>
                <DropdownCategories>
                    <Dropdown options={categories} onChange={filterByCategories} value={categories[0] } placeholder="Select an option" />
                </DropdownCategories>
                <FilterAlpha>
                    { isOrderedAZ 
                        ? <img src={SortAZ} onClick={() => orderState(false)} style={{"cursor":"pointer"}} /> 
                        : <img src={SortZA} onClick={() => orderState(true)} style={{"cursor":"pointer"}} /> 
                    }
                </FilterAlpha>
            </Content>
        </Wrapper>
    )
}

export default Filters;