import { useCallback, useEffect, useState } from 'react'

import * as Yup from 'yup';
// import components
import NoteItem from '../components/Note/NoteItem';
// import constants
// import { notes } from '../constants/note.constant';
import { useFormik } from 'formik';
import axios,{AxiosResponse} from 'axios';
import { TNote } from '../types/notes';


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
const NoteForm=({onSubmit}:NoteFormProps)=>{
    const formik = useFormik<TNoteFormValues>({
        initialValues:defaultValues,
        validationSchema,
        onSubmit
    })
    return <div>
        <form>
            <input value={formik.values.title} onChange={(e)=>formik.setFieldValue('title',e.target.value)}/>
            <button 
                onClick={()=>{
                    formik.handleSubmit()
                }}
                disabled={!formik.isValid}
                type='button'
            >
                Create
            </button>
        </form>
    </div>
}

const AddNote = ()=>{
    return <NoteForm onSubmit={(values)=>{
        window.alert(JSON.stringify(values))
    }}/>
}

const fetchNotes= async()=>{
    const res = await axios.get<null,AxiosResponse<{data:TNote[]}>>("/notes");
    console.log(res.data)
    return res.data
}

const createNote = async (data:Omit<TNote,"id"|"content">)=>{
    const res = await axios.post<Omit<TNote,"id"|"content">,AxiosResponse<{data:TNote}>>("/notes",data);
    return res.data
}

const deleteNote= async(id:string)=>{
    const res = await axios.delete<null,AxiosResponse<{data:{isSuccess:true}}>>(`/notes/${id}`);
    console.log(res.data)

    return res.data
}

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
        return notes.map(({content,title,id},idx)=>(
            <NoteItem 
                id={id}
                content={content}
                title={title}
                key={idx}
                onClickDelete={async()=>{
                    const confirmation = window.confirm("Are you sure you want to delete this item?")
                    if(confirmation){
                          
                        const res = await deleteNote(id.toString())
    
                        if(res.data.isSuccess){
                            setFetchFlag(Math.random())
                        }
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
            setFetchFlag(Math.random())
        }}/>
        {renderNotes()}
    </div>
  )
}

export default Home