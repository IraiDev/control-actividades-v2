import React from 'react'

function TodoCard({ title, desc }) {
  return (
    <div className="col-span-12 p-4 bg-white rounded-md shadow-md lg:col-span-6 xl:col-span-4 2xl:col-span-3">
      <div className="mb-1 font-semibold text-gray-800">
        <h5>{title}</h5>
      </div>
      <hr />
      <div className="pr-2 my-2 text-xs text-justify h-52 scroll-row">
        <p>{desc}</p>
      </div>
      <hr />
      <div className="flex justify-end pt-2 text-gray-700">
        <button
          className="focus:outline-none active:outline-none"
        // onClick={() => {
        //   handleUpdate();
        // }}
        >
          <i className="fas fa-pen"></i>
        </button>
        <button
          className="ml-3 focus:outline-none active:outline-none"
        // onClick={() => {
        //   handleDelete();
        // }}
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  )
}

export default TodoCard
