"use client"
import React, {useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { useRouter, redirect } from 'next/navigation';
import { Context } from './Clients';

const AddTodoForm = () => {

  const [title,SetTitle] = useState("");
  const [description,SetDescription] = useState("");
  const { user } = useContext(Context);
  const router = useRouter();

  const submitHandler = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/newtask",{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          title,
          description
        })
      })
      const data=await res.json();

      if(!data.success) toast.error(data.message);
      toast.success(data.message)
      router.refresh();
      SetTitle("");
      SetDescription("");
    } catch (error) {
        toast.error("An error occurred while processing the request."); 
    }
  }

  if (!user._id) return redirect("/login");

  return (
    <div className='login'>
      <section>
        <form onSubmit={submitHandler}>
            <input type='text' value={title} onChange={(e)=>SetTitle(e.target.value)} placeholder='Task Title'/>
            <input type='text' value={description} onChange={(e)=>SetDescription(e.target.value)} placeholder='Task Description'/>
            <button type='submit'>Add Task</button>
        </form>
      </section>
    </div>
  )
}

export default AddTodoForm
