// import React from 'react'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup'
// import { notes } from '../constants/note.constant';
import { useEffect, useState } from 'react';
import { TNote } from '../types/notes';
import axios, { AxiosResponse } from 'axios';


export type TUpdateNoteFormValues ={
    title:string;
    content:string;
}
const defaultValues : TUpdateNoteFormValues=
{
    title:"",
    content:""
}

const validationSchema = Yup.object({
    title:Yup.string().min(1,"Minimum 1 character is needed").required("Title is required"),
    content:Yup.string()
})

interface UpdateNoteFormProps{
    onSubmit:(values: TUpdateNoteFormValues)=> void,
    initialValues?: TUpdateNoteFormValues
}
const UpdateNoteForm=({onSubmit,initialValues}:UpdateNoteFormProps)=>{
    const formik = useFormik<TUpdateNoteFormValues>({
        initialValues: initialValues||defaultValues,
        validationSchema,
        onSubmit
    })
    return <div>
        <form>
            <div>
                <input value={formik.values.title} onChange={(e)=>formik.setFieldValue('title',e.target.value)}/>
            </div>
            <div>
                <textarea value={formik.values.content} onChange={(e)=>formik.setFieldValue('content',e.target.value)}/>
            </div>

            <button 
                onClick={()=>{
                    formik.handleSubmit()
                }}
                disabled={!formik.isValid}
                type = 'button'
            >
                Update
            </button>
        </form>
    </div>
}

const getNote= async(id:string)=>{
    const res = await axios.get<null,AxiosResponse<{data:TNote}>>(`/notes/${id}`);
    console.log(res.data)

    return res.data
}
const updateNote = async (id:string,data:Omit<TNote,"id">)=>{
    const res = await axios.put<Omit<TNote,"id">,AxiosResponse<{data:TNote}>>(`/notes/${id}`,data);
    return res.data
}

const Note = () => {
    const params = useParams<{id:string}>();

    const [noteData,setNoteData]=useState<TNote>();

    useEffect(()=>{
        if(params.id){
            const callGetNote = async()=>{
                const result = await getNote(params.id as string);
                setNoteData(result.data)
            }
            callGetNote()
        }
        
    },[params.id])
  return (
    <div>
        <h1>Note{params.id}</h1>
        {
            noteData?
            <UpdateNoteForm
            onSubmit={async (values)=>{
                // window.alert(JSON.stringify(values))
                await updateNote(params.id as string,values);
            }}
            initialValues={noteData?{
                content: noteData.content,
                title:noteData.title 
            }:undefined}
        />:<p>Loading...</p>
        }
        
    </div>
  )
}

export default Note