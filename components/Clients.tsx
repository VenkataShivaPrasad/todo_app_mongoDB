"use client"

import { TodoBtnProps, TodoItemProps } from "@/custom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, createContext, ReactNode, useContext, useEffect } from "react"
import toast, { Toaster } from "react-hot-toast";

interface ContextValue {
    user: any;
    SetUser: React.Dispatch<React.SetStateAction<{}>>;
}

export const Context = createContext<ContextValue>({ user: {}, SetUser: () => {} })

export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, SetUser] = useState({})

   
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) SetUser(data.user);
      });
  }, []);

    return <Context.Provider value={{ user, SetUser }}>
        {children}
        <Toaster/>
    </Context.Provider>
}

export const LogoutBtn = () => {

  const {user, SetUser} = useContext(Context)

    const logoutHandler = async () => {
        try {
          const res = await fetch("api/auth/logout");

          const data = await res.json();

          if(!data.success) return toast.error(data.message);

          SetUser({});

          toast.success(data.message)

        } catch (error) {
          console.log(error);
          
        }
    }


    return (
        <>
            {user._id ? (
                <button onClick={logoutHandler} className="btn">
                    Log out
                </button>
            ) : (
                <Link href="/login">Login</Link>
            )}
        </>
    )
}


export const TodoButton = ({ id, completed }:TodoBtnProps) => {
  const router = useRouter();
    const deleteHandler = async (id:string) => {
      try {
        const res = await fetch(`/api/task/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) return toast.error(data.message);
        toast.success(data.message);
        router.refresh();
      } catch (error) {
        return toast.error("Something went wrong");
      }
    };

    const updateHandler = async (id:string) => {
      try {
        const res = await fetch(`/api/task/${id}`, {
          method: "PUT",
        });
        const data = await res.json();
        if (!data.success) return toast.error(data.message);
        toast.success(data.message);
        router.refresh();
      } catch (error) {
        return toast.error("Something went wrong");
      }
    };

    return (
      <>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => updateHandler(id)}
        />
        <button className="btn" onClick={() => deleteHandler(id)}>
          Delete
        </button>
      </>
    );
  };

