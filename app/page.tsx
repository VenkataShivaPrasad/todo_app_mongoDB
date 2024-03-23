import React, { Suspense } from "react";
import Form from "../components/addTodoForm"
import Todos from "./Todos";

const Page = async () => {
  return (
    <div className="container">
      <Form />

      <Suspense fallback={<div>loading...</div>}>
        <Todos />
      </Suspense>
    </div>
  );
};

export default Page;