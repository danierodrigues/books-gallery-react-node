import React from "react";
import { Link } from "react-router-dom";

//Images
import Logo from '../../images/book-logo.svg';
//Styles
import { Wrapper, Content, LogoImg } from "./Header.styles";

const Header = () => {

    return(
        <Wrapper>
            <Content>
                <Link to="/">
                    <LogoImg src={Logo} alt='logo'/>
                </Link>
                <Link to="/book/create" className="linkHeaders">
                    <h1 className="linkHeaders">Create Book</h1>
                </Link>
            </Content>
        </Wrapper>
    )
};

export default Header;