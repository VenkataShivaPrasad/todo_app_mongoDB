
import { TodoItem } from '@/components/ServerComponents';
import { TodoItemProps } from '@/custom';
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const fetchTodo = async (token: string | undefined) => {
    
    try {
    const res = await fetch(`${process.env.URL}/api/mytask`,{
      method:"GET",
      cache:"no-cache",
      headers: {
        cookie: `token=${token}`,
      },
    })

    const data = await res.json();

    if(!data.success) return [];

    return data.tasks;

  } catch (error) {
    return []
  }
}
export default async function Home() {

    
    
    const token: string | undefined = cookies().get("token")?.value;
    
    const tasks = await fetchTodo(token);


  return (
      <section className="todosContainer">
          {
            tasks?.map((i: TodoItemProps)=>(
              <TodoItem
           title={i.title}
            description={i.description}
             _id={i._id} 
             key={i._id}
             isCompleted={i.isCompleted}/>
            ))
          }
      </section>
  );
}
