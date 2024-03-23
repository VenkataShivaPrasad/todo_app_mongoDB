"use client"

import React, { useContext,useState } from 'react'
import { Context } from '@/components/Clients';
import Link from 'next/link'

import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';


const Page = () => {

  const [email,SetEmail] = useState("");
  const [password,SetPassword] = useState("");
  const {user,SetUser} = useContext(Context)

  const loginHandler = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const res = await fetch("/api/auth/login",{
        method:"POST",
        cache:"no-cache",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          password
        })
      });
      const data = await res.json()

      if(!data.success) return toast.error(data.message);
      
      SetUser(data.user)
      toast.success(data.message)
      console.log(data);
      
    }catch (err){
      console.log(err);
      
    }
  }

  if(user._id) return redirect("/")

  return (
    <div className='login'>
      <section>
        <form onSubmit={loginHandler}>
            <input onChange={(e)=>SetEmail(e.target.value)} type='email' value={email} placeholder='Enter Email'/>
            <input  onChange={(e)=>SetPassword(e.target.value)} type='password'  value={password} placeholder='Enter Password'/>
            <button type='submit'>Login</button>

            <p>OR</p>
            <Link href="/register">New User</Link>

        </form>
      </section>
    </div>
  )
}



export default Page
