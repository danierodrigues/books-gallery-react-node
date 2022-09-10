import styled from 'styled-components';

export const Wrapper = styled.div`
    background: var(--darkGrey);
    padding: 0 20px;
`;

export const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: var(--maxWidth);
    padding: 5px 0;
    margin: 0 auto;

    .linkHeaders{
        text-decoration: none;
    }
`;

export const LogoImg = styled.img`
    width: 100px;

    @media screen and (max-width: 500px){
        width: 75px;
    }
`;
