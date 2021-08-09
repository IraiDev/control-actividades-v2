import React from 'react'

function ButtonList({ title, icon = 'mr-4 fas fa-bars', actions = true }) {
  return (
    <div
      className={`hover:bg-gray-800 rounded-md hover:shadow-inner my-1 px-4 flex justify-between items-center text-transparent hover:text-blue-400`}
    >
      <div className="flex items-center text-white hover:text-blue-400">
        <span>
          <i className={icon}></i>
        </span>
        <button
          className="py-3 text-left w-44 focus:outline-none"
        // onClick={() => {
        //   handleGetTodos();
        // }}
        >
          <p className="font-semibold">{title}</p>
        </button>
      </div>
      {
        actions ?
          (
            <div className="flex justify-between hover:text-blue-400">
              <button
                className="active:outline-none focus:outline-none"
              // onClick={() => {
              //   handleUpdateList();
              // }}
              >
                <i className="fas fa-pen hover:text-green-400"></i>
              </button>
              <button
                className="active:outline-none focus:outline-none"
              // onClick={async () => {
              //   handleDeleteList();
              // }}
              >
                <i className="ml-3 fas fa-trash hover:text-red-400"></i>
              </button>
            </div>
          ) : ''
      }
    </div>
  )
}

export default ButtonList
