import React from "react";
//Components
import Thumb from "../Thumb";
//Image
import NoImage from '../../images/no_image.jpg';
//Styles
import { Wrapper, Content, Text } from "./BookInfo.styles";

const BookInfo = ({ book }) => (
    <Wrapper>
        <Content>
            <Thumb image={
                book?.volumeInfo?.imageLinks?.thumbnail
                ? `${book.volumeInfo.imageLinks?.thumbnail}`
                : NoImage
            }
            clickable={false}
            alt='book-thumb'
            />
            <Text>
                <h1>{book.volumeInfo?.title}</h1>
                <br />
                <h3>DESCRIPTION</h3>
                <p dangerouslySetInnerHTML={{__html: book.volumeInfo?.description}}></p>
                <br/>
                <div className="rating-authors">
                    <div>
                        <h3>RATING</h3>
                        <div className="score">{book.volumeInfo?.averageRating}</div>
                    </div>
                    <div className="author">
                        <h3>Authors{book.volumeInfo?.authors?.length > 1 ? 'S' : ''}</h3>
                        {book.volumeInfo?.authors?.map((author, index) => (
                            <p key={index}>{author}</p>
                        ))}
                    </div>
                </div>

            </Text>
        </Content>
    </Wrapper>
);


export default BookInfo;