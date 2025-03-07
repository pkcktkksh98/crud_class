import { Link } from 'react-router-dom';
import IconButton from '../shared/IconButton';
import {FaTrash} from 'react-icons/fa';
import styled from 'styled-components';

type NoteItemProps = {
    title:string;
    content: string;
    onClickDelete:()=>void;
    id: string;
}

const StyleDiv = styled.div`
    width: 200px;
    padding: 24px;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
    border: 1px solid ${(props)=>props.theme.colors.primary};
    border-radius: 16px;
`

const FlexDiv = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: start;
    height: 100%;
`
const NoteItem = ({content,title,onClickDelete,id}:NoteItemProps)=>{
    return <StyleDiv>
        <FlexDiv>
        <Link to={`/note/${id}`}>
            <div>{title}</div>
        </Link>
            <div>{content.slice(0,20)+"..."}</div>
        </FlexDiv>
        <IconButton onClick={onClickDelete}><FaTrash/></IconButton>
    </StyleDiv>
}

export default NoteItem