import { Link } from 'react-router-dom';

type NoteItemProps = {
    title:string;
    content: string;
    onClickDelete:()=>void;
    id: number
}

const NoteItem = ({content,title,onClickDelete,id}:NoteItemProps)=>{
    return <div>
        <Link to={`/note/${id}`}>
            <div>{title}</div>
            <div>{content.slice(0,20)+"..."}</div>
        </Link>
        <button onClick={onClickDelete}>Delete</button>
    </div>
}

export default NoteItem