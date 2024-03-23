import { LogoutBtn } from '@/components/Clients'
import Link from 'next/link'
import React from 'react'


const Header = () => {
  return (
    <div className='
     header
    '>
      <div>
        <h1>Todo App</h1>
      </div>
      <article>
        <Link href="/">Home</Link>
        <LogoutBtn/>
      </article>
    </div>
  )
}

export default Header
