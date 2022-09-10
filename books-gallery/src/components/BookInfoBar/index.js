import React from "react";

//styles
import { Wrapper, Content } from "./BookInfoBar.styles";

const BookInfoBar = ({ publisher, datePublished, numberPages }) => (
    <Wrapper>
        <Content>
            <div className="column">
                <p>Publisher: {publisher}</p>
            </div>
            <div className="column">
                <p>Published Date: {datePublished}</p>
            </div>
            <div className="column">
                <p>Number of pages: {numberPages}</p>
            </div>
        </Content>
    </Wrapper>
);


export default BookInfoBar;