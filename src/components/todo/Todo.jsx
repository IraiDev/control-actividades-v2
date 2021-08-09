import React from 'react'
import TodoCard from './TodoCard'

function Todo() {
  return (
    <>
      <div className="flex justify-end">
        <button
          className="px-2 pt-1 pb-2 font-semibold text-blue-500 hover:text-green-600 active:outline-none focus:outline-none"
        // onClick={() => {
        //   openModalCreateTodo();
        // }}
        >
          Agregar ToDo...
        </button>
      </div>
      <div className="grid grid-cols-12 gap-3">
        <TodoCard />
        <TodoCard />
        <TodoCard />
      </div>
    </>
  )
}

export default Todo
