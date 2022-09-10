import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';

export const FormWrapper = styled.div`
    max-width: var(--maxWidth);
    background-size: cover;
    background-position: center;
    padding: 40px 20px;
    width: 100%;
    margin: 0 auto;
    
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    max-width: var(--maxWidth);
    //width: 100%;
    margin: 0 auto;
    //background: rgba(0, 0, 0, 0.7);
    border-radius: 20px;
    h1{
        color:black;
    }

    .datepicker{
        margin-top: 30px;
    }
   /* @media screen and (max-width: 768px) {
        display: block;
        max-height: none;
    }*/
`;