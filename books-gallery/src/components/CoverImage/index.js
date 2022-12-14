import React from 'react';
//Styles
import { Wrapper, Content, Text } from './CoverImage.styles';

const CoverImage = ({ image, title, text }) => (
    <Wrapper image={image}>
        <Content>
            <Text>
                <h1>{title}</h1>
                <p>{text}</p>
            </Text>
        </Content>
    </Wrapper>
);


export default CoverImage;