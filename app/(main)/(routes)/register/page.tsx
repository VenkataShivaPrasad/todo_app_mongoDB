"use client"

import React, { useContext,useState } from 'react'
import { Context } from '@/components/Clients';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';

const Page = () => {
  const [name,SetName] = useState("");
  const [email,SetEmail] = useState("");
  const [password,SetPassword] = useState("");
  const {user,SetUser} = useContext(Context)


  const registerHandler = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register",{
        method:"POST",
        cache:"no-cache",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      })
      const data = await res.json()

      if(!data.success) return toast.error(data.message);
      
      SetUser(data.user)
      toast.success(data.message)
      
    } catch (error) {
      console.log(error);
      
    }
  } 

  if(user._id) return redirect("/")
  

  return (
    <div className='login'>
    <section>
      <form onSubmit={registerHandler}>
          <input onChange={(e)=>SetName(e.target.value)} value={name} type='text' placeholder='Enter Name'/>
          <input onChange={(e)=>SetEmail(e.target.value)} value={email} type='email'  placeholder='Enter Email'/>
          <input  onChange={(e)=>SetPassword(e.target.value)} value={password} type='password' placeholder='Enter Password'/>
          <button type='submit'>Sign Up</button>

          <p>OR</p>
          <Link href="/login">Log In</Link>

      </form>
    </section>
  </div>
  )
}



export default Page
