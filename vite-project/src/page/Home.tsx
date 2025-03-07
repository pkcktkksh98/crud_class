import { useCallback, useEffect, useState } from 'react'

import * as Yup from 'yup';
// import components
import NoteItem from '../components/Note/NoteItem';
// import constants
// import { notes } from '../constants/note.constant';
import { useFormik } from 'formik';
import axios,{AxiosResponse} from 'axios';
import { TNote } from '../types/notes';
import Button from '../components/shared/Button';
import styled from 'styled-components';
import Input from '../components/shared/Input';
import { toast } from 'react-toastify';
// import TextArea from '../components/shared/TextArea';


export type TNoteFormValues ={
    title:string;
}
const defaultValues : TNoteFormValues=
{
    title:""
}

const validationSchema = Yup.object({
    title:Yup.string().min(1,"Minimum 1 character is needed").required("Title is required")
})

interface NoteFormProps{
    onSubmit:(values: TNoteFormValues)=> void
}

const StyledForm = styled.form`
    display:flex;
    gap:16px;
`
const NoteForm=({onSubmit}:NoteFormProps)=>{
    const formik = useFormik<TNoteFormValues>({
        initialValues:defaultValues,
        validationSchema,
        onSubmit
    })
    return<StyledForm>
            <Input style={{width: 300}} placeholder="Title" value={formik.values.title} onChange={(e)=>formik.setFieldValue('title',e.target.value)}/>
            <Button
                onClick={()=>{
                    formik.handleSubmit()
                }}
                disabled={!formik.isValid}
                type='button'
            >
                Create
            </Button>
            
        </StyledForm>
   
}

// const AddNote = ()=>{
//     return <NoteForm onSubmit={(values)=>{
//         window.alert(JSON.stringify(values))
//     }}/>
// }

const fetchNotes= async()=>{
    const res = await axios.get<null,AxiosResponse<{data:TNote[]}>>(URL+"/fetch-note");
    console.log(res.data)
    return res.data
}

const createNote = async (data:Omit<TNote,"_id"|"content">)=>{
    const res = await axios.post<Omit<TNote,"id"|"content">,AxiosResponse<{data:TNote}>>(URL+"/create-note",data);
    return res.data
}

const deleteNote= async(id:string)=>{
    const res = await axios.delete<null,AxiosResponse<{data:{isSuccess:true}}>>(URL+`/delete-note/${id}`);
    console.log(res.data)

    return res.data
}

const NotesContainer = styled.div`
     display:flex;
     flex-wrap: wrap;
     gap:16px;
     margin-top: 24px;
`
const Home = () => {

    const[notes,setNotes]=useState<TNote[]>([]);
    const [fetchFlag,setFetchFlag]=useState<number>(0)
    useEffect(()=>{
        const getNotes = async ()=>{{
            const notes = await fetchNotes();
            setNotes(notes.data)
        }}

        getNotes();
    },[fetchFlag])
    const renderNotes = useCallback(()=>{
        return notes.map(({content,title,_id},idx)=>(
            <NoteItem 
                id={_id}
                content={content}
                title={title}
                key={idx}
                onClickDelete={async()=>{
                    const confirmation = window.confirm("Are you sure you want to delete this item?")
                    if(confirmation){
                        await deleteNote(_id)
                        toast.success("Successfully deleted note")
                        setFetchFlag(Math.random())
                    }
                }}
            />
        ))
    },[notes])

  return (
    <div>
        <h1>Home</h1>
        <NoteForm onSubmit={async (value)=>{
            await createNote(value);
            toast.success("Successfully created a note")
            setFetchFlag(Math.random())
        }}/>
        <NotesContainer>
            {renderNotes()}
        </NotesContainer>
    </div>
  )
}

export default Home