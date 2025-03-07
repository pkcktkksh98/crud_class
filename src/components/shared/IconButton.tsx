import styled from 'styled-components'

const IconButton = styled.button`
    transition: all ease 0.2s;
    color:${(props)=>props.theme.colors.white};
    background-color:${(props)=>props.theme.colors.primary};
    padding: 6px;
    border-radius: 100%;
    color: white;
    font-size: 16px;
    cursor: pointer;
    pointer-events: all;
    outline:none;
    border: none;
    display:flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${(props)=>props.theme.colors.primary};

    &:hover{
        background-color:${(props)=>props.theme.colors.secondary};
        color: ${(props)=>props.theme.colors.primary};
    }
`
export default IconButton;