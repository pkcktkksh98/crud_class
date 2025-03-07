import styled from 'styled-components'

const Button = styled.button<{variant?: "primary"|"secondary"}>`
    font-size: 1em;
    padding: 0.5em 0.75em;
    border-radius: 7.5px;
    cursor: pointer;

    color: ${(props)=>props.theme.colors.white};
    background-color:${(props)=>props.variant === "secondary"? props.theme.colors.secondary : props.theme.colors.primary};
    font-weight:600;
    border: 1px solid ${(props)=>props.variant === "secondary"?props.theme.colors.white : props.theme.colors.primary};

    &:hover{
        background-color: ${(props)=>props.theme.colors.secondary};
        color: ${(props)=>props.theme.colors.primary};
        border: 1px solid ${(props)=>props.theme.colors.primary};

    }
`

export default Button