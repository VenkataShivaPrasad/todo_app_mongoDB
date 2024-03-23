import { LogoutBtn } from '@/components/Clients'
import Link from 'next/link'
import React from 'react'


const Header = () => {
  return (
    <div className='
     header
    '>
      <div>
        <h2>Todo App</h2>
      </div>
      <article>
        <Link href="/">Home</Link>
        <LogoutBtn/>
      </article>
    </div>
  )
}

export default Header
