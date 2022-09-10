import React from "react";
import { Link } from "react-router-dom";
//Styles
import { Image } from "./Thumb.styles";
import NoImage from "../../images/no_image.jpg";

const Thumb = ({ image, bookId, clickable, bookTitle }) => (
    <div>
        {clickable ? (
            <Link to={`/${bookId}`}>
                <Image src={image ? image : NoImage} alt={bookTitle} />
            </Link>
        ) : (
            <Image src={image ? image : NoImage} alt={bookTitle} />
        )}
    </div>
);


export default Thumb;