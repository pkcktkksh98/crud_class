// import React from 'react'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup'
// import { notes } from '../constants/note.constant';
import { useEffect, useState } from 'react';
import { TNote } from '../types/notes';
import axios, { AxiosResponse } from 'axios';
import TextArea from '../components/shared/TextArea';
import Input from '../components/shared/Input';
import Button from '../components/shared/Button';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { URL } from '../constants/misc.constant';


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

const StyledForm = styled.form`
  
  display:flex;
  flex-direction: column;
  gap: 16px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const UpdateNoteForm=({onSubmit,initialValues}:UpdateNoteFormProps)=>{
    const formik = useFormik<TUpdateNoteFormValues>({
        initialValues: initialValues||defaultValues,
        validationSchema,
        onSubmit
    })
    return<StyledForm>
            <div>
                <Input style={{width:'100%'}} value={formik.values.title} onChange={(e)=>formik.setFieldValue('title',e.target.value)}/>
            </div>
            <div>
                <TextArea style={{width:'100%'}} value={formik.values.content} onChange={(e)=>formik.setFieldValue('content',e.target.value)}/>
            </div>

            <Button 
                onClick={()=>{
                    formik.handleSubmit()
                }}
                disabled={!formik.isValid}
                type = 'button'
            >
                Update
            </Button>
        </StyledForm>
    
}

const getNote= async(id:string)=>{
    const res = await axios.get<null,AxiosResponse<{data:TNote}>>(URL+`/get-notes?id=${id}`);
    console.log(res.data)

    return res.data
}
const updateNote = async (id:string,data:Omit<TNote,"_id">)=>{
    const res = await axios.put<Omit<TNote,"id">,AxiosResponse<{data:TNote}>>(URL+`/update-notes?id=${id}`,data);
    return res.data
}

const StyledTitle = styled.h1`
    text-align: center;
`

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
        <StyledTitle>Note{params.id}</StyledTitle>
        {
            noteData?
            <UpdateNoteForm
            onSubmit={async (values)=>{
                // window.alert(JSON.stringify(values))
                await updateNote(params.id as string,values);

                toast.success("Successfully note updated")
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