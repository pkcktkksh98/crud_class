import styled from 'styled-components';

const Input = styled.input`
    height:32px;
    margin : 8px 0px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.2s ease-in-out;
    box-sizing: border-box;

    &:focus{
        border-color:${(props)=>props.theme.colors.primary};
    }

    /* &:hover{
        border-color:#888;
    } */
`;

export default Input